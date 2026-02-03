require("dotenv").config();
const express=require("express");
const cors=require("cors");
const dbCondig=require("./config/db.config");
const userRouter = require("./routes/user.route");
const app=express();
app.use(cors({origin:'http://localhost:5173/'}));
app.use(express.json());


const PORT=process.env.PORT;

app.use('/api/user', userRouter);


app.listen(PORT , async()=>{
    await dbCondig();
    console.log(`Server started at http://localhost:${PORT}`);
    
})