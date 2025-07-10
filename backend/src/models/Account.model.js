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
                maxlength: 12,
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

// Generate account number before validation if missing
const { generateAccountNumber } = require("../utils/accountNumberUtils");

Schema.pre("validate", function(next){
    if(this.account_number && this.account_number.length === 12){
        return next();
    }
    if(!this.user){
        console.warn('[Account.model] Missing user for account number generation');
        return next();
    }
    this.account_number = generateAccountNumber(this.user.toString(), this._id.toString(), this.ac_type);
    console.log('[Account.model] Pre-validate generated account_number', this.account_number);
    next();
});

const model = mongoose.model("account",Schema)

exports.AccountModel = model