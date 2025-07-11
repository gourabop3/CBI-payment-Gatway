const Joi = require('joi');

class UPIValidation {
    static createUPIId = Joi.object({
        upi_id: Joi.string()
            .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Invalid UPI ID format. Use format: username@cbibank',
                'any.required': 'UPI ID is required'
            }),
        upi_pin: Joi.string()
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.pattern.base': 'UPI PIN must be exactly 6 digits',
                'any.required': 'UPI PIN is required'
            })
    });

    static verifyUPIPin = Joi.object({
        upi_pin: Joi.string()
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.pattern.base': 'UPI PIN must be exactly 6 digits',
                'any.required': 'UPI PIN is required'
            })
    });

    static changeUPIPin = Joi.object({
        current_pin: Joi.string()
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.pattern.base': 'Current UPI PIN must be exactly 6 digits',
                'any.required': 'Current UPI PIN is required'
            }),
        new_pin: Joi.string()
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.pattern.base': 'New UPI PIN must be exactly 6 digits',
                'any.required': 'New UPI PIN is required'
            })
    });

    static processPayment = Joi.object({
        receiverUpiId: Joi.string()
            .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Invalid receiver UPI ID format',
                'any.required': 'Receiver UPI ID is required'
            }),
        amount: Joi.number()
            .positive()
            .min(1)
            .max(100000)
            .required()
            .messages({
                'number.base': 'Amount must be a number',
                'number.positive': 'Amount must be positive',
                'number.min': 'Amount must be at least ₹1',
                'number.max': 'Amount cannot exceed ₹1,00,000',
                'any.required': 'Amount is required'
            }),
        note: Joi.string()
            .max(50)
            .optional()
            .messages({
                'string.max': 'Note cannot exceed 50 characters'
            }),
        upi_pin: Joi.string()
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.pattern.base': 'UPI PIN must be exactly 6 digits',
                'any.required': 'UPI PIN is required'
            }),
        accountId: Joi.string()
            .required()
            .messages({
                'any.required': 'Account ID is required'
            })
    });

    static searchUPIId = Joi.object({
        upi_id: Joi.string()
            .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Invalid UPI ID format',
                'any.required': 'UPI ID is required'
            })
    });

    static getTransactions = Joi.object({
        page: Joi.number()
            .integer()
            .min(1)
            .default(1)
            .messages({
                'number.base': 'Page must be a number',
                'number.integer': 'Page must be an integer',
                'number.min': 'Page must be at least 1'
            }),
        limit: Joi.number()
            .integer()
            .min(1)
            .max(50)
            .default(10)
            .messages({
                'number.base': 'Limit must be a number',
                'number.integer': 'Limit must be an integer',
                'number.min': 'Limit must be at least 1',
                'number.max': 'Limit cannot exceed 50'
            }),
        type: Joi.string()
            .valid('send', 'receive', 'all')
            .optional()
            .messages({
                'any.only': 'Type must be send, receive, or all'
            })
    });

    static generateQR = Joi.object({
        amount: Joi.number()
            .positive()
            .min(1)
            .max(100000)
            .optional()
            .messages({
                'number.base': 'Amount must be a number',
                'number.positive': 'Amount must be positive',
                'number.min': 'Amount must be at least ₹1',
                'number.max': 'Amount cannot exceed ₹1,00,000'
            }),
        note: Joi.string()
            .max(50)
            .optional()
            .messages({
                'string.max': 'Note cannot exceed 50 characters'
            })
    });
}

module.exports = UPIValidation;