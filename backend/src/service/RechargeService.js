const { AccountModel } = require("../models/Account.model");
const { TransactionModel } = require("../models/Transactions.model");
const { RechargeModel } = require("../models/Recharge.model");
const { UserModel } = require("../models/User.model");
const { DiscountModel } = require("../models/Discount.model");
const { RechargePlanModel } = require("../models/RechargePlan.model");
const ApiError = require("../utils/ApiError");
const NotificationService = require("./NotificationService");
const mongoose = require("mongoose");
const { generateAccountNumber } = require("../utils/accountNumberUtils");

class RechargeService {
    /**
     * Process mobile recharge
     */
    static async processMobileRecharge(rechargeData, userId) {
        const { mobileNumber, operator, amount, discountCode } = rechargeData;

        // Validate input
        if (!mobileNumber || !operator || !amount) {
            throw new ApiError(400, "Missing required fields");
        }

        // Validate mobile number format
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobileNumber)) {
            throw new ApiError(400, "Invalid mobile number format");
        }

        // Calculate discount (if any) just once
        let payableAmount = amount;
        let appliedDiscount = null;
        if (discountCode) {
            const discountObj = await this.validateAndApplyDiscount(discountCode, amount);
            appliedDiscount = discountObj;
            payableAmount = discountObj.payableAmount;
        }

        if (payableAmount < 10) {
            throw new ApiError(400, "Minimum recharge amount is ₹10");
        }

        // Get user and account details
        const user = await UserModel.findById(userId).populate('account_no');
        if (!user || !user.account_no || user.account_no.length === 0) {
            throw new ApiError(404, "User account not found");
        }

        const account = user.account_no[0]; // Primary account

        if (account.amount < payableAmount) {
            throw new ApiError(400, "Insufficient balance for recharge");
        }

        // Start database transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Create recharge record
            const recharge = new RechargeModel({
                user: userId,
                account: account._id,
                rechargeType: 'mobile',
                mobileNumber: mobileNumber,
                operator: operator,
                amount: amount,
                status: 'pending'
            });

            // Create debit transaction
            const transaction = new TransactionModel({
                account: account._id,
                user: userId,
                amount: payableAmount,
                type: 'debit',
                isSuccess: false,
                remark: `Mobile Recharge - ${this.getOperatorName(operator)} - ${mobileNumber}`,
                rechargeId: recharge._id
            });

            // Save recharge and transaction
            await recharge.save({ session });
            await transaction.save({ session });

            // Simulate recharge processing (in real scenario, this would call operator API)
            const rechargeSuccess = await this.simulateRechargeProcessing(operator, mobileNumber, amount);

            if (rechargeSuccess) {
                // Update account balance
                await AccountModel.findByIdAndUpdate(
                    account._id,
                    { $inc: { amount: -payableAmount } },
                    { session }
                );

                // Update recharge status
                recharge.status = 'success';
                recharge.processedAt = new Date();
                await recharge.save({ session });

                // Update transaction status
                transaction.isSuccess = true;
                transaction.remark = `Mobile Recharge Successful - ${this.getOperatorName(operator)} - ${mobileNumber}`;
                await transaction.save({ session });

                // Commit transaction
                await session.commitTransaction();

                // Send notifications asynchronously
                setImmediate(async () => {
                    try {
                        const generatedAccountNumber = generateAccountNumber(user._id, account._id, account.ac_type);
                        await NotificationService.sendMobileRechargeEmail(
                            user.name,
                            user.email,
                            payableAmount,
                            mobileNumber,
                            operator,
                            recharge.transactionId,
                            generatedAccountNumber
                        );

                        await NotificationService.sendMobileRechargeSMS(
                            user.name,
                            mobileNumber,
                            payableAmount,
                            operator,
                            recharge.transactionId,
                            mobileNumber // Send SMS to the recharged number
                        );

                        await NotificationService.createAnnouncement(
                            userId,
                            'mobile_recharge',
                            'Mobile Recharge Successful',
                            `₹${payableAmount} recharge completed for ${mobileNumber} via ${this.getOperatorName(operator)}`
                        );
                    } catch (notificationError) {
                        console.error("Failed to send recharge notifications:", notificationError);
                    }
                });

                return {
                    success: true,
                    message: "Mobile recharge completed successfully",
                    transactionId: recharge.transactionId,
                    details: {
                        mobileNumber: mobileNumber,
                        operator: this.getOperatorName(operator),
                        amount: payableAmount,
                        discount: appliedDiscount,
                        newBalance: account.amount - payableAmount
                    }
                };

            } else {
                // Recharge failed
                recharge.status = 'failed';
                recharge.failureReason = 'Operator service unavailable';
                await recharge.save({ session });

                transaction.remark = `Mobile Recharge Failed - ${this.getOperatorName(operator)} - ${mobileNumber}`;
                await transaction.save({ session });

                await session.commitTransaction();

                throw new ApiError(500, "Recharge failed due to operator service issue");
            }

        } catch (error) {
            await session.abortTransaction();
            throw new ApiError(500, "Recharge processing failed: " + error.message);
        } finally {
            session.endSession();
        }
    }

    /**
     * Process bill payment
     */
    static async processBillPayment(billData, userId) {
        const { billType, consumerNumber, amount, rechargeType } = billData;

        // Validate input
        if (!billType || !consumerNumber || !amount) {
            throw new ApiError(400, "Missing required fields");
        }

        // Validate amount
        if (amount < 10) {
            throw new ApiError(400, "Minimum bill payment amount is ₹10");
        }

        // Get user and account details
        const user = await UserModel.findById(userId).populate('account_no');
        if (!user || !user.account_no || user.account_no.length === 0) {
            throw new ApiError(404, "User account not found");
        }

        const account = user.account_no[0]; // Primary account

        // Check sufficient balance
        if (account.amount < amount) {
            throw new ApiError(400, "Insufficient balance for bill payment");
        }

        // Start database transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Create recharge record for bill payment
            const billPayment = new RechargeModel({
                user: userId,
                account: account._id,
                rechargeType: 'bill',
                billType: billType,
                consumerNumber: consumerNumber,
                amount: amount,
                status: 'pending'
            });

            // Create debit transaction
            const transaction = new TransactionModel({
                account: account._id,
                user: userId,
                amount: amount,
                type: 'debit',
                isSuccess: false,
                remark: `Bill Payment - ${this.getBillTypeName(billType)} - ${consumerNumber}`,
                rechargeId: billPayment._id
            });

            // Save bill payment and transaction
            await billPayment.save({ session });
            await transaction.save({ session });

            // Simulate bill payment processing
            const paymentSuccess = await this.simulateBillPaymentProcessing(billType, consumerNumber, amount);

            if (paymentSuccess) {
                // Update account balance
                await AccountModel.findByIdAndUpdate(
                    account._id,
                    { $inc: { amount: -amount } },
                    { session }
                );

                // Update bill payment status
                billPayment.status = 'success';
                billPayment.processedAt = new Date();
                await billPayment.save({ session });

                // Update transaction status
                transaction.isSuccess = true;
                transaction.remark = `Bill Payment Successful - ${this.getBillTypeName(billType)} - ${consumerNumber}`;
                await transaction.save({ session });

                // Commit transaction
                await session.commitTransaction();

                // Send notifications asynchronously
                setImmediate(async () => {
                    try {
                        const generatedAccountNumber = generateAccountNumber(user._id, account._id, account.ac_type);
                        await NotificationService.sendBillPaymentEmail(
                            user.name,
                            user.email,
                            amount,
                            billType,
                            consumerNumber,
                            billPayment.transactionId,
                            generatedAccountNumber
                        );

                        await NotificationService.sendBillPaymentSMS(
                            user.name,
                            user.phone || '9999999999', // Use user's phone or default
                            amount,
                            billType,
                            consumerNumber,
                            billPayment.transactionId
                        );

                        await NotificationService.createAnnouncement(
                            userId,
                            'bill_payment',
                            'Bill Payment Successful',
                            `₹${amount} payment completed for ${this.getBillTypeName(billType)} - ${consumerNumber}`
                        );
                    } catch (notificationError) {
                        console.error("Failed to send bill payment notifications:", notificationError);
                    }
                });

                return {
                    success: true,
                    message: "Bill payment completed successfully",
                    transactionId: billPayment.transactionId,
                    details: {
                        billType: this.getBillTypeName(billType),
                        consumerNumber: consumerNumber,
                        amount: amount,
                        newBalance: account.amount - amount
                    }
                };

            } else {
                // Payment failed
                billPayment.status = 'failed';
                billPayment.failureReason = 'Service provider unavailable';
                await billPayment.save({ session });

                transaction.remark = `Bill Payment Failed - ${this.getBillTypeName(billType)} - ${consumerNumber}`;
                await transaction.save({ session });

                await session.commitTransaction();

                throw new ApiError(500, "Bill payment failed due to service provider issue");
            }

        } catch (error) {
            await session.abortTransaction();
            throw new ApiError(500, "Bill payment processing failed: " + error.message);
        } finally {
            session.endSession();
        }
    }

    /**
     * Get recharge history for user
     */
    static async getRechargeHistory(userId) {
        const history = await RechargeModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(50);

        return {
            success: true,
            history: history.map(item => ({
                transactionId: item.transactionId,
                type: item.rechargeType,
                amount: item.amount,
                status: item.status,
                description: item.description,
                date: item.createdAt,
                processedAt: item.processedAt,
                // Mobile specific
                mobileNumber: item.mobileNumber,
                operator: item.operator ? this.getOperatorName(item.operator) : null,
                // Bill specific
                billType: item.billType ? this.getBillTypeName(item.billType) : null,
                consumerNumber: item.consumerNumber
            }))
        };
    }

    /**
     * Get available operators
     */
    static async getOperators() {
        const operators = [
            { id: 'jio', name: 'Jio', logo: '🔵', color: '#0066cc' },
            { id: 'airtel', name: 'Airtel', logo: '🔴', color: '#dc2626' },
            { id: 'vi', name: 'Vi (Vodafone Idea)', logo: '🟣', color: '#7c3aed' },
            { id: 'bsnl', name: 'BSNL', logo: '🟡', color: '#eab308' },
            { id: 'mtnl', name: 'MTNL', logo: '🟠', color: '#ea580c' },
            { id: 'reliance', name: 'Reliance', logo: '🟢', color: '#16a34a' },
            { id: 'tata', name: 'Tata Docomo', logo: '⚫', color: '#374151' },
            { id: 'telenor', name: 'Telenor', logo: '🔵', color: '#2563eb' }
        ];

        return {
            success: true,
            operators: operators
        };
    }

    /**
     * Simulate recharge processing (replace with actual operator API integration)
     */
    static async simulateRechargeProcessing(operator, mobileNumber, amount) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 95% success rate simulation
        return Math.random() > 0.05;
    }

    /**
     * Simulate bill payment processing
     */
    static async simulateBillPaymentProcessing(billType, consumerNumber, amount) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 98% success rate for bill payments
        return Math.random() > 0.02;
    }

    /**
     * Get operator display name
     */
    static getOperatorName(operatorId) {
        const operators = {
            jio: 'Jio',
            airtel: 'Airtel',
            vi: 'Vi (Vodafone Idea)',
            bsnl: 'BSNL',
            mtnl: 'MTNL',
            reliance: 'Reliance',
            tata: 'Tata Docomo',
            telenor: 'Telenor'
        };
        return operators[operatorId] || operatorId;
    }

    /**
     * Get bill type display name
     */
    static getBillTypeName(billTypeId) {
        const billTypes = {
            electricity: 'Electricity Bill',
            water: 'Water Bill',
            gas: 'Gas Bill',
            credit_card: 'Credit Card Payment',
            broadband: 'Broadband/Internet Bill',
            dth: 'DTH/Cable TV Bill'
        };
        return billTypes[billTypeId] || billTypeId;
    }

    /* -------------------- Discount helpers -------------------- */
    static async validateAndApplyDiscount(code, amount){
        const disc = await DiscountModel.findOne({ code: code.toUpperCase() });
        if(!disc) throw new ApiError(404,'Invalid discount code');
        const now = new Date();
        if(!(disc.validFrom <= now && now <= disc.validTo)) throw new ApiError(400,'Discount expired');
        if(disc.used >= disc.usageLimit) throw new ApiError(400,'Discount exhausted');
        if(amount < disc.minAmount) throw new ApiError(400,`Minimum amount for this discount is ₹${disc.minAmount}`);

        let discountValue = disc.discountType==='flat'? disc.value : (amount * disc.value /100);
        const payable = Math.max(0, amount - discountValue);

        // Increment usage counter atomically
        await DiscountModel.updateOne({ _id: disc._id }, { $inc: { used: 1 } });

        return {
            code: disc.code,
            discountType: disc.discountType,
            value: disc.value,
            discountAmount: discountValue,
            payableAmount: payable
        };
    }

    /* -------------------- Suggestions -------------------- */
    static async getSuggestions(operator, amount){
        const plans = await RechargePlanModel.find({ operator, isActive:true })
            .sort({ amount: 1 })
            .limit(10);

        // discounts
        const now = new Date();
        const discounts = await DiscountModel.find({
            validFrom: { $lte: now },
            validTo: { $gte: now },
            minAmount: { $lte: amount },
            $expr: { $lt: ["$used", "$usageLimit"] }
        });

        // compute best discount (highest savings)
        let best = null;
        for(const d of discounts){
            const savings = d.discountType==='flat'? d.value : amount*d.value/100;
            if(!best || savings > best.savings){
                best = {
                    code: d.code,
                    discountType: d.discountType,
                    value: d.value,
                    savings,
                    payable: Math.max(0, amount - savings)
                }
            }
        }

        return { plans, bestDiscount: best };
    }
}

module.exports = RechargeService;