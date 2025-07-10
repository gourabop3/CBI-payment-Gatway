const { TransactionModel } = require('../models/Transactions.model');
const { RechargeModel } = require('../models/Recharge.model');
const { generateAccountNumber, formatAccountNumber } = require('../utils/AccountUtils');

class ChatbotService {
    static async processMessage(message, userId, user) {
        const lowerMessage = message.toLowerCase().trim();
        
        // First check if it's a banking-related query
        if (!this.isBankingRelated(lowerMessage)) {
            return this.getNonBankingResponse();
        }

        // Process banking queries
        if (this.isGreeting(lowerMessage)) {
            return this.getGreetingResponse(user.name);
        }

        if (this.isBalanceQuery(lowerMessage)) {
            return await this.getBalanceResponse(user);
        }

        if (this.isTransactionQuery(lowerMessage)) {
            return await this.getTransactionResponse(userId);
        }

        if (this.isAccountQuery(lowerMessage)) {
            return this.getAccountInfoResponse(user);
        }

        if (this.isServicesQuery(lowerMessage)) {
            return this.getBankingServicesResponse();
        }

        if (this.isKYCQuery(lowerMessage)) {
            return this.getKYCResponse(user);
        }

        if (this.isRechargeQuery(lowerMessage)) {
            return await this.getRechargeResponse(userId);
        }

        if (this.isLoanQuery(lowerMessage)) {
            return this.getLoanInfoResponse();
        }

        if (this.isContactQuery(lowerMessage)) {
            return this.getContactResponse();
        }

        if (this.isHelpQuery(lowerMessage)) {
            return this.getHelpResponse();
        }

        // Default banking response
        return this.getDefaultBankingResponse();
    }

    static isBankingRelated(message) {
        const bankingKeywords = [
            'account', 'balance', 'transaction', 'deposit', 'withdraw', 'transfer',
            'payment', 'recharge', 'bill', 'loan', 'credit', 'debit', 'bank',
            'money', 'amount', 'kyc', 'statement', 'atm', 'card', 'ifsc',
            'branch', 'customer', 'service', 'help', 'support', 'hello',
            'hi', 'hey', 'thanks', 'thank you', 'fd', 'fixed deposit',
            'savings', 'current', 'interest', 'neft', 'rtgs', 'imps'
        ];
        
        return bankingKeywords.some(keyword => message.includes(keyword));
    }

    static isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
        return greetings.some(greeting => message.includes(greeting));
    }

    static isBalanceQuery(message) {
        const balanceKeywords = ['balance', 'money', 'amount', 'funds'];
        return balanceKeywords.some(keyword => message.includes(keyword));
    }

    static isTransactionQuery(message) {
        const transactionKeywords = ['transaction', 'history', 'statement', 'payment', 'transfer'];
        return transactionKeywords.some(keyword => message.includes(keyword));
    }

    static isAccountQuery(message) {
        const accountKeywords = ['account', 'number', 'details', 'information', 'ifsc'];
        return accountKeywords.some(keyword => message.includes(keyword));
    }

    static isServicesQuery(message) {
        const serviceKeywords = ['service', 'services', 'what can', 'features', 'offer'];
        return serviceKeywords.some(keyword => message.includes(keyword));
    }

    static isKYCQuery(message) {
        const kycKeywords = ['kyc', 'verification', 'verify', 'document'];
        return kycKeywords.some(keyword => message.includes(keyword));
    }

    static isRechargeQuery(message) {
        const rechargeKeywords = ['recharge', 'mobile', 'phone', 'bill', 'electricity', 'water'];
        return rechargeKeywords.some(keyword => message.includes(keyword));
    }

    static isLoanQuery(message) {
        const loanKeywords = ['loan', 'credit', 'borrow', 'emi', 'interest'];
        return loanKeywords.some(keyword => message.includes(keyword));
    }

    static isContactQuery(message) {
        const contactKeywords = ['contact', 'support', 'help', 'customer care', 'phone', 'email'];
        return contactKeywords.some(keyword => message.includes(keyword));
    }

    static isHelpQuery(message) {
        const helpKeywords = ['help', 'assist', 'support', 'how to', 'what is'];
        return helpKeywords.some(keyword => message.includes(keyword));
    }

    static getNonBankingResponse() {
        return `🏦 I'm specialized in banking services only! 

I can help you with:
• Account information & balance
• Transaction history
• Banking services
• KYC verification
• Recharge & bill payments
• Loans & deposits
• Customer support

Please ask me about banking-related topics.

💡 **Created By Gourab**`;
    }

    static getGreetingResponse(userName) {
        const greetings = [
            `Hello ${userName}! 👋 How can I assist you with your banking needs today?`,
            `Hi ${userName}! 😊 Welcome to CBI Bank. What can I help you with?`,
            `Good day ${userName}! 🌟 I'm here to help with your banking queries.`
        ];
        
        return greetings[Math.floor(Math.random() * greetings.length)] + 
               `\n\n💡 **Created By Gourab**`;
    }

    static async getBalanceResponse(user) {
        if (!user.account_no || user.account_no.length === 0) {
            return `💳 You don't have any active accounts yet. Please contact customer support to set up your account.

💡 **Created By Gourab**`;
        }

        const totalBalance = user.account_no.reduce((sum, account) => sum + account.amount, 0);
        const primaryAccount = user.account_no[0];
        
        return `💰 **Account Balance Information**

Primary Account: ₹${primaryAccount.amount.toLocaleString()}
Account Type: ${primaryAccount.ac_type}

${user.account_no.length > 1 ? `Total Balance (All Accounts): ₹${totalBalance.toLocaleString()}` : ''}

Need to add money? Use our deposit feature!

💡 **Created By Gourab**`;
    }

    static async getTransactionResponse(userId) {
        try {
            // Get recent transactions
            const transactions = await TransactionModel.find({ user: userId })
                .sort({ createdAt: -1 })
                .limit(5)
                .lean();

            const recharges = await RechargeModel.find({ user: userId })
                .sort({ createdAt: -1 })
                .limit(3)
                .lean();

            if (transactions.length === 0 && recharges.length === 0) {
                return `📋 **Transaction History**

No transactions found yet. Start by:
• Making a deposit
• Doing a recharge
• Transferring money

💡 **Created By Gourab**`;
            }

            let response = `📋 **Recent Transaction History**\n\n`;
            
            if (transactions.length > 0) {
                response += `**Banking Transactions:**\n`;
                transactions.forEach((txn, index) => {
                    const date = new Date(txn.createdAt).toLocaleDateString();
                    const type = txn.type === 'credit' ? '💰 Credit' : '💸 Debit';
                    response += `${index + 1}. ${type} - ₹${txn.amount.toLocaleString()} (${date})\n`;
                });
            }

            if (recharges.length > 0) {
                response += `\n**Recharges & Bills:**\n`;
                recharges.forEach((rch, index) => {
                    const date = new Date(rch.createdAt).toLocaleDateString();
                    response += `${index + 1}. ${rch.rechargeType} - ₹${rch.amount.toLocaleString()} (${date})\n`;
                });
            }

            response += `\nView complete history in the Transactions section!

💡 **Created By Gourab**`;
            
            return response;
        } catch (error) {
            return `❌ Unable to fetch transaction history at the moment. Please try again later.

💡 **Created By Gourab**`;
        }
    }

    static getAccountInfoResponse(user) {
        if (!user.account_no || user.account_no.length === 0) {
            return `💳 **Account Information**

No active accounts found. Please contact customer support.

💡 **Created By Gourab**`;
        }

        const primaryAccount = user.account_no[0];
        const accountNumber = generateAccountNumber(user._id, primaryAccount._id, primaryAccount.ac_type);
        
        return `💳 **Account Information**

Account Holder: ${user.name}
Account Number: ${formatAccountNumber(accountNumber)}
Account Type: ${primaryAccount.ac_type}
Current Balance: ₹${primaryAccount.amount.toLocaleString()}
IFSC Code: CBIN001234
Branch: CBI Bank - Main Branch

Email: ${user.email}
KYC Status: ${user.kyc_status || 'Not submitted'}

💡 **Created By Gourab**`;
    }

    static getBankingServicesResponse() {
        return `🏦 **CBI Banking Services**

💰 **Account Services:**
• View balance & account details
• Fund transfers (NEFT/RTGS/IMPS)
• Account statements

📱 **Recharge & Bills:**
• Mobile recharge (All operators)
• Utility bill payments
• DTH & broadband bills

💳 **Cards & ATM:**
• ATM card management
• Card blocking/unblocking

📊 **Investments:**
• Fixed deposits
• Recurring deposits

🔒 **Security:**
• KYC verification
• Transaction alerts
• Account protection

Need help with any specific service?

💡 **Created By Gourab**`;
    }

    static getKYCResponse(user) {
        const kycStatus = user.kyc_status || 'not_submitted';
        
        let statusMessage = '';
        switch (kycStatus) {
            case 'verified':
                statusMessage = '✅ Your KYC is verified and approved!';
                break;
            case 'pending':
                statusMessage = '⏳ Your KYC is under review. We\'ll notify you once approved.';
                break;
            case 'rejected':
                statusMessage = '❌ Your KYC was rejected. Please resubmit with correct documents.';
                break;
            default:
                statusMessage = '📋 KYC not submitted yet. Complete it to access all features.';
        }

        return `🔒 **KYC Verification Status**

${statusMessage}

**Required Documents:**
• Aadhaar Card
• PAN Card
• Address Proof
• Phone number verification

**Benefits of KYC:**
• Full account access
• Higher transaction limits
• All banking features
• Account statements

${kycStatus !== 'verified' ? 'Complete your KYC in the KYC section!' : ''}

💡 **Created By Gourab**`;
    }

    static async getRechargeResponse(userId) {
        try {
            const recentRecharges = await RechargeModel.find({ user: userId })
                .sort({ createdAt: -1 })
                .limit(3)
                .lean();

            let response = `📱 **Recharge & Bill Services**

**Available Services:**
• Mobile recharge (Jio, Airtel, Vi, BSNL)
• Electricity bills
• Water bills
• Gas bills
• DTH/Cable TV
• Broadband/Internet

`;

            if (recentRecharges.length > 0) {
                response += `**Your Recent Recharges:**\n`;
                recentRecharges.forEach((rch, index) => {
                    const date = new Date(rch.createdAt).toLocaleDateString();
                    const status = rch.status === 'success' ? '✅' : '⏳';
                    response += `${index + 1}. ${status} ${rch.rechargeType} - ₹${rch.amount} (${date})\n`;
                });
                response += '\n';
            }

            response += `Ready to recharge? Visit the Recharge section!

💡 **Created By Gourab**`;

            return response;
        } catch (error) {
            return `📱 **Recharge & Bill Services**

Quick and easy recharge for:
• Mobile phones (All operators)
• Electricity, Water, Gas bills
• DTH & Internet services

Visit the Recharge section to get started!

💡 **Created By Gourab**`;
        }
    }

    static getLoanInfoResponse() {
        return `💼 **Loan Services**

**Available Loan Types:**
• Personal Loans (2-5 years)
• Home Loans (up to 30 years)
• Car Loans (up to 7 years)
• Education Loans
• Business Loans

**Features:**
• Competitive interest rates
• Quick approval process
• Flexible repayment options
• Minimal documentation

**EMI Calculator Available**
Calculate your monthly payments before applying!

**Eligibility:**
• KYC verified account
• Regular income proof
• Good credit score

Contact our loan specialists for personalized assistance!

💡 **Created By Gourab**`;
    }

    static getContactResponse() {
        return `📞 **Customer Support**

**24/7 Support Available:**
• Phone: 1800-XXX-XXXX (Toll Free)
• Email: support@cbibank.com
• WhatsApp: +91-XXXXX-XXXXX

**Branch Timings:**
Monday - Friday: 10:00 AM - 4:00 PM
Saturday: 10:00 AM - 2:00 PM
Sunday: Closed

**Emergency Services:**
• Card blocking: *XXX#
• Balance inquiry: *XXX#
• Mini statement: *XXX#

**Online Support:**
Use this chatbot 24/7 for instant help!

**Head Office:**
CBI Bank, Banking Street
Mumbai, Maharashtra - 400001

💡 **Created By Gourab**`;
    }

    static getHelpResponse() {
        return `🤝 **How Can I Help You?**

**I can assist with:**

🏦 **Banking Basics:**
• Check account balance
• View transaction history
• Account information

💰 **Transactions:**
• Fund transfers
• Payment history
• Transaction limits

📱 **Services:**
• Mobile recharge
• Bill payments
• Service charges

🔒 **Security:**
• KYC verification
• Account safety
• Card services

💼 **Products:**
• Loan information
• Fixed deposits
• Investment options

**Quick Commands:**
• "Show balance" - Check account balance
• "Recent transactions" - View history
• "Account details" - Get account info
• "Recharge info" - Recharge services

Just ask me anything about banking!

💡 **Created By Gourab**`;
    }

    static getDefaultBankingResponse() {
        return `🤔 I understand you're asking about banking, but I need more details to help you better.

**Try asking:**
• "What's my account balance?"
• "Show recent transactions"
• "How to do a recharge?"
• "What banking services do you offer?"
• "Help with KYC verification"

**Or browse these topics:**
• Account Information
• Transaction History
• Recharge & Bills
• Loans & Deposits
• Customer Support

I'm here to make banking easy for you!

💡 **Created By Gourab**`;
    }

    static async getChatHistory(userId, limit = 20) {
        // This would typically be stored in a database
        // For now, return empty array as we're not storing chat history
        return [];
    }
}

module.exports = ChatbotService;