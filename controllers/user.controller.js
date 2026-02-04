const transporter = require("../config/mail.config");
const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
// create account
const createAccount = async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the details",
      });
    }

    const user = await UserModel.findOne({ email: email });
    console.log(user);

    if (user && user.isVerified) {
      return res
        .status(400)
        .json({ message: "User account is already created" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);

    if (!hashedPass) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    const otp = Math.floor(1000 + Math.random() * 90000);
    console.log(otp);

    transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "OTP for Feathers Registration",
      text: `The otp is ${otp} . It will expire after 2 minutes. Please do not share it with anyone`,
    });

    const otpExpiry = Date.now() + 2 * 60 * 1000;
    console.log(otpExpiry);

    const newUser = new UserModel({
      username: username,
      email: email,
      password: hashedPass,
      otp: otp,
      otpExpiry: otpExpiry,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

//verifyEmail
const verifyEmail = async (req, res) => {
  const email = req.params.email;
  const { otp } = req.body;

  const userFound = await UserModel.findOne({ email: email });

  if (!userFound) {
    return res.json({ message: "Please check the email id" });
  }

  if (!otp) {
    return res.json({ message: "Please enter the otp" });
  }

  if (userFound.isVerified) {
    return res.json({ message: "User already created with this email" });
  }

  if (otp != userFound.otp || userFound.otpExpiry < Date.now()) {
    return res.json({ message: "OTP not matched or expired" });
  }

  userFound.otp = null;
  userFound.isVerified = true;
  userFound.otpExpiry = null;
  await userFound.save();

  return res.json({ message: "OTP matched and Account created Successfully" });
};



//login
const login=async(req, res)=>{
  try {
       const {email , password}=req.body;
    
    if(!email || !password){
      return res.status(400).json({
        message:'Please fill all the details'
      })
    }

    const userExist=await UserModel.findOne({email:email})

    if(!userExist){
      return res.status(400).json({
        message:'Please create an account first'
      })
    }

    const isMatched=await bcrypt.compare(password , userExist.password)

    if(!isMatched){
      return res.status(400).json({
        message:'Email or password is wrong .Please try again later'
      })
    }
     
    const token=await jwt.sign({id: userExist._id , email} , 'secret'  , {expiresIn:'2h'}) 

    if(!token){
      return res.status(400).json({
        message:'There is somethig wrong Please try again later'
      })
    }
    console.log('token',token);
    
    res.cookie('token' , token)
    res.status(200).json({
      message:`Welcome ${userExist.username}`
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message)
    
  }
   
}


const post=async(req, res)=>{
  console.log(req.user);
  const email=req.user.email;
  const user=await UserModel.findOne({email:email});

  return res.json(`Welcome to Posts section Dear ${user.username}`)
  
}
module.exports = { createAccount, verifyEmail  , login , post};
