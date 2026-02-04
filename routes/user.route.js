const express=require("express");
const { createAccount, verifyEmail, login } = require("../controllers/user.controller");


const userRouter=express.Router();

userRouter.post("/register", createAccount);

userRouter.post("/verify/:email" , verifyEmail);

userRouter.post("/login", login);

module.exports=userRouter;