const jwt=require("jsonwebtoken");
const authUser=async(req, res, next)=>{

     try {
            console.log(req.cookies);
    const token=req.cookies.token;

    if(!token){
        return res.status(400).json({
            message:'Please login first'
        })
    }
    const tokenMatched=await jwt.verify(token , 'secret');

    if(!tokenMatched){
        return res.status(400).json({
            message:'Please login again You are unauthorized user'
        })
    }
     req.user=tokenMatched;
     next();

     } catch (error) {
        console.log(error);
        return res.status(500).json(
            error.message
        )
        
     }
}


module.exports=authUser;