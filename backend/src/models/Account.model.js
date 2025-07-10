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
                default: function(){
                    const { generateAccountNumber } = require("../utils/accountNumberUtils");
                    if(!this.user) return undefined;
                    return generateAccountNumber(this.user.toString(), this._id.toString(), this.ac_type);
                }
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

// No need for pre-save hook thanks to default generator

const model = mongoose.model("account",Schema)

exports.AccountModel = model