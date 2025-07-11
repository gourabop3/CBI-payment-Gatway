const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    // Transaction ID (UPI reference number)
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    
    // Sender details
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    // Receiver details
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    // UPI IDs involved
    senderUpiId: {
        type: String,
        required: true
    },
    
    receiverUpiId: {
        type: String,
        required: true
    },
    
    // Amount details
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    
    // Transaction details
    note: {
        type: String,
        trim: true,
        maxlength: 50
    },
    
    // Transaction status
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
    
    // Transaction type
    type: {
        type: String,
        enum: ['send', 'request', 'collect'],
        required: true
    },
    
    // Bank account used for transaction
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: true
    },
    
    // UPI app used (for tracking)
    upiApp: {
        type: String,
        default: 'CBI Bank UPI'
    },
    
    // Additional metadata
    metadata: {
        deviceInfo: String,
        location: String,
        ipAddress: String
    },
    
    // Timestamps
    processedAt: Date,
    failedAt: Date,
    failureReason: String
}, {
    timestamps: true
});

// Index for faster queries
schema.index({ sender: 1, createdAt: -1 });
schema.index({ receiver: 1, createdAt: -1 });
schema.index({ transactionId: 1 });
schema.index({ status: 1 });

const model = mongoose.model("upi_transaction", schema);

exports.UPITransactionModel = model;