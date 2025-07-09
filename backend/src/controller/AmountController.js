const AmountService = require("../service/AmountService")

class AmountController{


    static addMoney = async(req,res)=>{
        const res_obj = await AmountService.addMoney(req.body,req.user)
        res.status(200).send(res_obj)
    }

    static verifyPayment = async(req,res)=>{
        try {
            const res_obj = await AmountService.verifyPayment(req.body,req.params.txn_id)
            
            // Check if this is an API call (has Authorization header) or a redirect callback
            const isApiCall = req.headers.authorization || req.headers['content-type']?.includes('application/json')
            
            if (isApiCall) {
                // Direct API call from frontend - return JSON response
                if (res_obj.url.includes('success=')) {
                    res.status(200).send({
                        success: true,
                        message: "Payment verified successfully",
                        url: res_obj.url
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        message: "Payment verification failed",
                        url: res_obj.url
                    })
                }
            } else {
                // Callback from Razorpay - redirect as before
                res.redirect(res_obj.url)
            }
        } catch (error) {
            console.error("Error in verifyPayment controller:", error)
            
            const isApiCall = req.headers.authorization || req.headers['content-type']?.includes('application/json')
            
            if (isApiCall) {
                res.status(500).send({
                    success: false,
                    message: "Payment verification error",
                    error: error.message
                })
            } else {
                res.redirect(`${process.env.FRONTEND_URI}/transactions?error=Payment verification error`)
            }
        }
    }
    
    static getAllTransactions = async(req,res)=>{
        const res_obj = await AmountService.getAllTransactions(req.user)
        res.status(200).send(res_obj)
    }
    
    static addNewAccount = async(req,res)=>{
        const res_obj = await AmountService.addNewAccount(req.user,req.body)
        res.status(201).send(res_obj)
    }

    // New method for checking transaction status
    static checkTransactionStatus = async(req,res)=>{
        try {
            const res_obj = await AmountService.checkTransactionStatus(req.params.txn_id, req.user)
            res.status(200).send(res_obj)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }

    // Debug methods for troubleshooting
    static debugTransaction = async(req,res)=>{
        try {
            const res_obj = await AmountService.debugTransaction(req.params.txn_id, req.user)
            res.status(200).send(res_obj)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }

    static debugAccount = async(req,res)=>{
        try {
            const res_obj = await AmountService.debugAccount(req.params.account_id, req.user)
            res.status(200).send(res_obj)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}

module.exports = AmountController