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
                console.log("Missing fields:", {
                    razorpay_order_id: !razorpay_order_id,
                    razorpay_payment_id: !razorpay_payment_id,
                    razorpay_signature: !razorpay_signature
                });
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
                console.log("Transaction not found in database:", txn_id);
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?error=Transaction not found`
                }
            }

            console.log("Transaction found:", {
                id: transaction._id,
                account: transaction.account,
                amount: transaction.amount,
                isSuccess: transaction.isSuccess,
                type: transaction.type,
                remark: transaction.remark
            });

            if (transaction.isSuccess) {
                console.log("Transaction already processed successfully:", txn_id);
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
                console.log("Payment signature verification FAILED");
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
            console.log("Looking up account:", transaction.account);
            const account = await AccountModel.findById(transaction.account);
            if (!account) {
                console.log("Account not found in database:", transaction.account);
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
                transactionAmount: transaction.amount,
                accountType: account.ac_type,
                userId: account.user
            });

            // Calculate new balance
            const oldBalance = account.amount;
            const transactionAmount = transaction.amount;
            const newBalance = oldBalance + transactionAmount;
            console.log("Balance calculation:", {
                oldBalance,
                transactionAmount,
                newBalance
            });

            // Use transaction to ensure atomicity - Update both account balance and transaction status together
            try {
                console.log("Starting balance update process...");
                
                // Update account balance
                const updatedAccount = await AccountModel.findByIdAndUpdate(
                    account._id,
                    { amount: newBalance },
                    { new: true } // Return updated document
                );

                if (!updatedAccount) {
                    throw new Error("Failed to update account balance - no document returned");
                }

                console.log("Account balance updated successfully:", {
                    accountId: updatedAccount._id,
                    oldBalance: oldBalance,
                    newBalance: updatedAccount.amount,
                    difference: updatedAccount.amount - oldBalance
                });

                // Verify the balance was actually updated
                if (updatedAccount.amount !== newBalance) {
                    throw new Error(`Balance mismatch: expected ${newBalance}, got ${updatedAccount.amount}`);
                }

                // Update transaction as successful
                console.log("Updating transaction status to successful...");
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
                    console.error("Failed to update transaction status");
                    // Rollback account balance if transaction update fails
                    console.log("Rolling back account balance...");
                    await AccountModel.findByIdAndUpdate(account._id, { amount: oldBalance });
                    throw new Error("Failed to update transaction status - rolled back balance");
                }

                console.log("Transaction updated successfully:", {
                    id: updatedTransaction._id,
                    isSuccess: updatedTransaction.isSuccess,
                    remark: updatedTransaction.remark
                });

                // Final verification - fetch updated account to confirm changes
                const finalAccount = await AccountModel.findById(account._id);
                console.log("Final account verification:", {
                    id: finalAccount._id,
                    finalBalance: finalAccount.amount,
                    expectedBalance: newBalance,
                    balanceCorrect: finalAccount.amount === newBalance
                });

                console.log("Payment verification completed successfully");
                console.log("=== Payment Verification Ended ===");

                // Redirect to transactions page with success message
                return {
                    url:`${process.env.FRONTEND_URI}/transactions?success=Payment successful! Amount ₹${transaction.amount} has been added to your account.`
                }

            } catch (updateError) {
                console.error("ERROR during balance/transaction update:", updateError);
                console.error("Update error details:", {
                    message: updateError.message,
                    stack: updateError.stack
                });
                
                // Mark transaction as failed
                try {
                    await TransactionModel.findByIdAndUpdate(txn_id, {
                        isSuccess: false,
                        remark: 'Payment Failed - Update error: ' + updateError.message
                    });
                    console.log("Transaction marked as failed due to update error");
                } catch (failureUpdateError) {
                    console.error("Failed to mark transaction as failed:", failureUpdateError);
                }

                return {
                    url:`${process.env.FRONTEND_URI}/transactions?error=Failed to update account balance. Please contact support.`
                }
            }

        } catch (error) {
            console.error("CRITICAL ERROR in payment verification:", error);
            console.error("Error details:", {
                message: error.message,
                stack: error.stack,
                txn_id: txn_id
            });
            
            // Mark transaction as failed in case of error
            try {
                await TransactionModel.findByIdAndUpdate(txn_id, {
                    isSuccess: false,
                    remark: 'Payment Failed - System Error: ' + error.message
                });
                console.log("Transaction marked as failed due to system error");
            } catch (updateError) {
                console.error("Failed to mark transaction as failed:", updateError);
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

    // Debug methods for troubleshooting
    static async debugTransaction(txn_id, user) {
        console.log("=== Debug Transaction ===");
        console.log("Transaction ID:", txn_id);
        console.log("User ID:", user);

        const transaction = await TransactionModel.findById(txn_id);
        if (!transaction) {
            throw new Error("Transaction not found");
        }

        console.log("Transaction details:", transaction);

        // Also get the related account
        const account = await AccountModel.findById(transaction.account);
        console.log("Related account:", account);

        return {
            transaction,
            account,
            debug_info: {
                transaction_user_match: transaction.user.toString() === user.toString(),
                account_exists: !!account,
                transaction_success: transaction.isSuccess,
                transaction_amount: transaction.amount,
                account_balance: account ? account.amount : null,
                created_at: transaction.createdAt,
                updated_at: transaction.updatedAt
            }
        };
    }

    // New method specifically for checking transaction status
    static async checkTransactionStatus(txn_id, user) {
        console.log("=== Check Transaction Status ===");
        console.log("Transaction ID:", txn_id);
        console.log("User ID:", user);

        const transaction = await TransactionModel.findById(txn_id);
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }

        // Verify the transaction belongs to the user
        if (transaction.user.toString() !== user.toString()) {
            throw new ApiError(403, "Unauthorized access to transaction");
        }

        console.log("Transaction status check:", {
            id: transaction._id,
            isSuccess: transaction.isSuccess,
            amount: transaction.amount,
            type: transaction.type,
            remark: transaction.remark,
            razorpayPaymentId: transaction.razorpayPaymentId,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        });

        // Get related account info
        const account = await AccountModel.findById(transaction.account);
        
        return {
            transaction: {
                id: transaction._id,
                isSuccess: transaction.isSuccess,
                amount: transaction.amount,
                type: transaction.type,
                remark: transaction.remark,
                razorpayPaymentId: transaction.razorpayPaymentId,
                razorpayOrderId: transaction.razorpayOrderId,
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt
            },
            account: account ? {
                id: account._id,
                balance: account.amount,
                type: account.ac_type
            } : null,
            status: transaction.isSuccess === true ? 'completed' : 
                   transaction.isSuccess === false ? 'failed' : 'pending'
        };
    }

    static async debugAccount(account_id, user) {
        console.log("=== Debug Account ===");
        console.log("Account ID:", account_id);
        console.log("User ID:", user);

        const account = await AccountModel.findById(account_id);
        if (!account) {
            throw new Error("Account not found");
        }

        console.log("Account details:", account);

        // Check if user owns this account
        if (account.user.toString() !== user.toString()) {
            throw new Error("Account does not belong to this user");
        }

        // Get recent transactions for this account
        const recentTransactions = await TransactionModel.find({account: account_id})
            .sort({createdAt: -1})
            .limit(10);

        console.log("Recent transactions:", recentTransactions);

        return {
            account,
            recent_transactions: recentTransactions,
            debug_info: {
                account_balance: account.amount,
                account_type: account.ac_type,
                user_match: account.user.toString() === user.toString(),
                transaction_count: recentTransactions.length,
                last_transaction: recentTransactions[0] || null,
                created_at: account.createdAt,
                updated_at: account.updatedAt
            }
        };
    }
}

module.exports = AmountService