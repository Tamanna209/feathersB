const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    caption:{
        type:String
    },
    medias:[{type:String}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
})

const PostModel=mongoose.model('Posts', postSchema);
module.exports=PostModel;