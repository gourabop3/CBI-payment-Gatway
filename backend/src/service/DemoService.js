/**
 * Demo Service - Provides mock data when running without MongoDB
 */

class DemoService {
    /**
     * Mock user data for demo
     */
    static getDemoUser() {
        return {
            _id: 'demo_user_123',
            name: 'John Demo User',
            email: 'demo@example.com',
            phone: '9876543210',
            isActive: true,
            account_no: [
                {
                    _id: 'demo_account_456',
                    ac_type: 'savings',
                    amount: 25000, // Demo balance of ₹25,000
                    createdAt: new Date('2024-01-01'),
                    updatedAt: new Date()
                }
            ],
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date()
        };
    }

    /**
     * Mock authentication token for demo
     */
    static getDemoToken() {
        return 'demo_token_123456789';
    }

    /**
     * Mock transaction history for demo
     */
    static getDemoTransactions() {
        return [
            {
                _id: 'demo_txn_1',
                amount: 1000,
                type: 'credit',
                isSuccess: true,
                remark: 'Demo Deposit',
                createdAt: new Date(Date.now() - 86400000), // 1 day ago
            },
            {
                _id: 'demo_txn_2',
                amount: 500,
                type: 'debit',
                isSuccess: true,
                remark: 'Demo Transfer to Account 001234567890',
                createdAt: new Date(Date.now() - 172800000), // 2 days ago
            },
            {
                _id: 'demo_txn_3',
                amount: 299,
                type: 'debit',
                isSuccess: true,
                remark: 'Mobile Recharge - Jio - 9876543210',
                createdAt: new Date(Date.now() - 259200000), // 3 days ago
            }
        ];
    }

    /**
     * Mock recharge history for demo
     */
    static getDemoRechargeHistory() {
        return [
            {
                transactionId: 'RCH123456',
                type: 'mobile',
                amount: 299,
                status: 'success',
                description: 'Mobile Recharge',
                date: new Date(Date.now() - 259200000),
                processedAt: new Date(Date.now() - 259200000),
                mobileNumber: '9876543210',
                operator: 'Jio'
            },
            {
                transactionId: 'RCH123457',
                type: 'bill',
                amount: 1500,
                status: 'success',
                description: 'Electricity Bill Payment',
                date: new Date(Date.now() - 604800000), // 7 days ago
                processedAt: new Date(Date.now() - 604800000),
                billType: 'Electricity Bill',
                consumerNumber: 'EB123456789'
            }
        ];
    }

    /**
     * Check if running in demo mode
     */
    static isDemoMode() {
        return process.env.DEMO_MODE === 'true';
    }

    /**
     * Mock successful operation response
     */
    static getMockSuccessResponse(message, data = {}) {
        return {
            success: true,
            message: message,
            ...data
        };
    }

    /**
     * Simulate processing delay for realism
     */
    static async simulateDelay(ms = 1000) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = DemoService;