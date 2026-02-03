const express=require("express");
const { createAccount, verifyEmail } = require("../controllers/user.controller");

const userRouter=express.Router();

userRouter.post("/register", createAccount);

userRouter.post("/verify/:email" , verifyEmail);
module.exports=userRouter;