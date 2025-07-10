const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user',
                required:true
            },
            amount:{
                type:Number,
                default:0
            },
            account_number: {
                type: String,
                unique: true,
                minlength: 12,
                maxlength: 12
            },
            ac_type:{
                type:String,
                required:true,
                enum:['saving','current'],
                default:'saving'
            }

},{
    timestamps:true
})

// Generate 12-digit account number before saving if not set
const { generateAccountNumber } = require("../utils/accountNumberUtils");

Schema.pre("save", function(next) {
    if (this.account_number && this.account_number.length === 12) {
        return next(); // already set
    }

    // Ensure we have user & _id populated
    if (!this.user || !this._id) {
        return next(new Error("Cannot generate account number without user and _id"));
    }

    this.account_number = generateAccountNumber(this.user.toString(), this._id.toString(), this.ac_type);
    next();
});

const model = mongoose.model("account",Schema)

exports.AccountModel = model