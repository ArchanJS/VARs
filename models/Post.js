const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:50
    },
    content:{
        type:String,
        required:true
    },
    postID:{
        type:String,
        required:true,
        unique:true
    },
    postedBy:{
        type:String,
        required:true
    },
    reactedBy:[{
        userID:String
    }]
},
{ timestamps: true }
)

const Post=new mongoose.model("posts",postSchema);

module.exports=Post;