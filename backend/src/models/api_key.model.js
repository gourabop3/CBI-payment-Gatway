const mongoose= require("mongoose")
const schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    api_hash:{
        type:String,
        required:true
    },
    api_secret:{
        type:String,
        required:true
    },
    payment_gateway_key:{
        type:String,
        required:false
    },
    merchant_id:{
        type:String,
        required:false
    },
    isOnWorking:{
        type:Boolean,
        default:true
    },
    number_of_regenerate:{
        type:Number,
        default:0   
    }
},{
    timestamps:true
})

const model = mongoose.model('api-keys',schema)

exports.APIKEYModel = model