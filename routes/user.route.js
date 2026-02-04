const express=require("express");
const { createAccount, verifyEmail, login, post } = require("../controllers/user.controller");
const authUser = require("../middlewares/authUser.middlewre");

const userRouter=express.Router();

userRouter.post("/register", createAccount);

userRouter.post("/verify/:email" , verifyEmail);

userRouter.post("/login", login);

userRouter.get("/post",  authUser, post);
module.exports=userRouter;