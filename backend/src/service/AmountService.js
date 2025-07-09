const { AccountModel } = require("../models/Account.model");
const { TransactionModel } = require("../models/Transactions.model");
const { UserModel } = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const { NewRazorpay } = require("../utils/Razarpay");
const crypto = require("crypto")
class AmountService{

    static async addMoney(body,user){
 
      const transaction=  await TransactionModel.create({
            account:body.account_no,
            user:user,
            amount:parseInt(body.amount),
            type:'credit',
            remark:'Payment Initiated - Waiting for Confirmation'
        })

        const options = {
            amount: parseInt(body.amount)*100,
            currency: 'INR',
            receipt: transaction._id
        };
        const order = await NewRazorpay.orders.create(options)

        return {
           order_id:order.id,
           txn_id:transaction._id
        }
    }

    static async verifyPayment(body,txn_id){
        try {
            console.log("=== Payment Verification Started ===");
            console.log("Transaction ID:", txn_id);
            console.log("Request Body:", body);

            const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = body;

            // Check if all required fields are present
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                console.log("Missing required fields in payment verification");
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?error=Missing payment data`
                }
            }

            // Check if RAZORPAY_KEY_SECRET is configured
            if (!process.env.RAZORPAY_KEY_SECRET) {
                console.error("RAZORPAY_KEY_SECRET is not configured!");
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?error=Payment configuration error`
                }
            }

            // Verify transaction exists first (before signature verification)
            const transaction = await TransactionModel.findById(txn_id);
            if (!transaction) {
                console.log("Transaction not found:", txn_id);
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?error=Transaction not found`
                }
            }

            console.log("Transaction found:", {
                id: transaction._id,
                account: transaction.account,
                amount: transaction.amount,
                isSuccess: transaction.isSuccess
            });

            if (transaction.isSuccess) {
                console.log("Transaction already processed:", txn_id);
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?success=Transaction already completed`
                }
            }

            // Verify the payment signature
            const body_data = razorpay_order_id + "|" + razorpay_payment_id;
            console.log("Body data for verification:", body_data);

            const expected_signature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(body_data)
                .digest("hex");

            console.log("Expected signature:", expected_signature);
            console.log("Received signature:", razorpay_signature);

            const isValid = expected_signature === razorpay_signature;
            console.log("Signature validation result:", isValid);

            if(!isValid){
                console.log("Payment signature verification failed");
                // Mark transaction as failed
                await TransactionModel.findByIdAndUpdate(txn_id, {
                    isSuccess: false,
                    razorpayOrderId: razorpay_order_id,
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    remark: 'Payment Failed - Invalid Signature'
                });
                
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?error=Payment verification failed`
                }
            }

            // Verify account exists before updating
            const account = await AccountModel.findById(transaction.account);
            if (!account) {
                console.log("Account not found:", transaction.account);
                // Mark transaction as failed
                await TransactionModel.findByIdAndUpdate(txn_id, {
                    isSuccess: false,
                    remark: 'Payment Failed - Account not found'
                });
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?error=Account not found`
                }
            }

            console.log("Account found:", {
                id: account._id,
                currentAmount: account.amount,
                transactionAmount: transaction.amount
            });

            // Calculate new balance
            const newBalance = account.amount + transaction.amount;
            console.log("Updating account balance from", account.amount, "to", newBalance);

            // Use transaction to ensure atomicity - Update both account balance and transaction status together
            try {
                // Update account balance
                const updatedAccount = await AccountModel.findByIdAndUpdate(
                    account._id,
                    { amount: newBalance },
                    { new: true } // Return updated document
                );

                if (!updatedAccount) {
                    throw new Error("Failed to update account balance");
                }

                console.log("Account balance updated successfully:", {
                    accountId: updatedAccount._id,
                    oldBalance: account.amount,
                    newBalance: updatedAccount.amount
                });

                // Update transaction as successful
                const updatedTransaction = await TransactionModel.findByIdAndUpdate(
                    txn_id,
                    {
                        isSuccess: true,
                        razorpayOrderId: razorpay_order_id,
                        razorpayPaymentId: razorpay_payment_id,
                        razorpaySignature: razorpay_signature,
                        remark: `Payment Successful - ₹${transaction.amount} credited to account`
                    },
                    { new: true }
                );

                if (!updatedTransaction) {
                    // Rollback account balance if transaction update fails
                    await AccountModel.findByIdAndUpdate(account._id, { amount: account.amount });
                    throw new Error("Failed to update transaction status");
                }

                console.log("Transaction updated successfully:", updatedTransaction._id);
                console.log("Payment verification completed successfully");
                console.log("=== Payment Verification Ended ===");

                // Redirect to transactions page with success message
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?success=Payment successful! Amount ₹${transaction.amount} has been added to your account.`
                }

            } catch (updateError) {
                console.error("Error during balance/transaction update:", updateError);
                
                // Mark transaction as failed
                await TransactionModel.findByIdAndUpdate(txn_id, {
                    isSuccess: false,
                    remark: 'Payment Failed - Update error: ' + updateError.message
                });

                return {
                    url:`${process.env.FRONTEND_URI}/transactions?error=Failed to update account balance. Please contact support.`
                }
            }

        } catch (error) {
            console.error("Error in payment verification:", error);
            
            // Mark transaction as failed in case of error
            try {
                await TransactionModel.findByIdAndUpdate(txn_id, {
                    isSuccess: false,
                    remark: 'Payment Failed - System Error: ' + error.message
                });
            } catch (updateError) {
                console.error("Error updating transaction on failure:", updateError);
            }

            return {
                url:`${process.env.FRONTEND_URI}/transactions?error=Payment processing failed. Please contact support.`
            }
        }
    }

    static async getAllTransactions(user){
        const all_transaction  =await TransactionModel.find({user})
        .sort({createdAt:-1})
        .select("type remark createdAt amount isSuccess")

        return all_transaction
    }

    static async addNewAccount(user,body){
        
      const exist_user=  await UserModel.findById(user)
      if(!exist_user){
        throw new ApiError(401,"User Not Found")
      }

      const ac=  await AccountModel.create({
            user,
            ac_type:body.ac_type,
            amount:0
        })

        await TransactionModel.create({
            account:ac._id,
            amount:0,
            remark:'New Account Opening - Welcome!',
            type:'credit',
            user:user,
            isSuccess:true
        })

        return {
            msg:"Account Created :)"
        }
    }
}

module.exports = AmountService