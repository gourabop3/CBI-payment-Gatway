const mongoose = require("mongoose")
const {faker} = require("@faker-js/faker")
const schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    mobile_no:{
        type:String,
        default:''
    },
    bio:{
        type:String,
        default:''
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    image:{
        type:{
            image_uri:String,
            public_id:String
        },
        default:{
             image_uri:faker.image.avatar(),
            public_id:''
        }
    },
    kyc_status:{
        type:String,
        enum:['not_submitted','pending','verified','rejected'],
        default:'not_submitted'
    },
    lastProfileUpdate:{
        type:Date,
        default:null
    }
},{
    timestamps:true
})

const model = mongoose.model("profile",schema)

exports.ProfileModel = model