const express = require("express")
const AmountValidation = require("../../validations/AmountValidation")
const ValidationMiddleware = require("../../middleware/ValidationMiddleware")
const AuthMiddleware = require("../../middleware/AuthMiddleware")
const AmountController = require("../../controller/AmountController")
const router = express.Router()
 

router.post('/add-money',AuthMiddleware,AmountValidation.addMoney,ValidationMiddleware,AmountController.addMoney)

router.post('/add-account',AuthMiddleware,AmountValidation.addAccount,ValidationMiddleware,AmountController.addNewAccount)

router.post('/payment/:txn_id',AmountController.verifyPayment)
router.get('/transactions',AuthMiddleware,AmountController.getAllTransactions)

// Debug endpoints for troubleshooting
router.get('/debug/transaction/:txn_id', AuthMiddleware, AmountController.debugTransaction)
router.get('/debug/account/:account_id', AuthMiddleware, AmountController.debugAccount)

module.exports = router