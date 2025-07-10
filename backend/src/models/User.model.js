const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lower:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    ac_type:{
        type:String,
        required:true,
        enum:['saving','current'],
        default:'saving'
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
    // Enable virtuals in output so populated data appears when using toJSON / toObject
    ,toJSON:{ virtuals:true }
    ,toObject:{ virtuals:true }
})

// Virtual populate to link user with their bank accounts
schema.virtual('account_no', {
    ref: 'account',          // The model to use
    localField: '_id',       // Find accounts where `user` field equals this user's _id
    foreignField: 'user',    // Field in AccountModel
    justOne: false           // A user can have multiple accounts
});

schema.pre("save",async function(next){
    const user =this;
    if(user.isModified("password")){
        this.password = await bcryptjs.hash(user.password,10)
    }
    next()
})

const model = mongoose.model("user",schema)

exports.UserModel =model