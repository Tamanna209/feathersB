const express=require("express");
const { createAccount } = require("../controllers/user.controller");
const userRouter=express.Router();

userRouter.post("/register", createAccount);

module.exports=userRouter;