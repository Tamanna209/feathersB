const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        default:'https://tse3.mm.bing.net/th/id/OIP.HZ1AAOPvNPupOo81no754gHaHa?pid=Api&P=0&h=220'
    },
    otp:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otpExpiry:{
        type:Date,

    }

}, {timestamps:true})

const UserModel=mongoose.model('Users', userSchema);

module.exports=UserModel;