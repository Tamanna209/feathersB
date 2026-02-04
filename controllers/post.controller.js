const UserModel = require("../models/users.model");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const PostModel = require("../models/posts.model");
const createPost = async (req, res) => {
    try {
  const id=req.params.id;
  const {  caption } = req.body;
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }

  const allmedia = [];
  for (let file of req.files) {
    let uploads = await cloudinary.uploader.upload(file.path, {
      folder: "/mediaUploads",
    });
    allmedia.push(uploads.secure_url);

    fs.unlinkSync(file.path);
  }

  const postCreated = new PostModel({
    caption: caption,
    medias: allmedia,
    createdBy: user._id,
  });

  await postCreated.save();
  return res.status(201).json({
    message: "Post created successfully",
    postCreated,
  });
    } catch (error) {
     console.log(error);
      
    }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("createdBy" , "username email");
    if(!posts){
        return res.status(200).json({
            message:'No posts yes'
        })
    }
    res.status(200).json({
      message: "All posts fetched",
      posts
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message)
    
  }
};
module.exports = { createPost , getPosts };
