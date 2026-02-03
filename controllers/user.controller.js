const transporter = require("../config/mail.config");
const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
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
    if (user) {
      return res
        .status(400)
        .json({ message: "User accoutn is already created" });
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
      otp:otp,
      otpExpiry:otpExpiry
    });

    await newUser.save();

    res.status(201).json({
        message:'User created Successfully',
        newUser
    })
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
        message:error.message
    })
  }
};


module.exports={createAccount}