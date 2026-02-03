const mongoose=require("mongoose");

const dbCondig=async()=>{
    await mongoose.connect('mongodb://localhost:27017/feathers')
    console.log('Connected to Database successfully');
    
}

module.exports=dbCondig;