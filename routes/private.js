const express = require('express');
const User = require('../models/User');
const authUser = require('../middlewares/authUser');
const bcryptjs = require('bcryptjs');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', authUser, (req, res) => {
    res.status(200).send(req.user);
})

router.patch('/updateprofile', authUser, async (req, res) => {
    try {
        const { name, profilePicture, bio, favouriteClub } = req.body;
        let userID = req.user.userID;
        await User.updateOne({ userID }, {
            $set: {
                name, profilePicture, bio, favouriteClub
            }
        })
        res.status(200).json({ message: "User updated!" });
    } catch (error) {
        res.status(400).json({ error: "Something went wrong!" });
    }
})

router.patch('/changepassword', authUser, async (req, res) => {
    try {
        let { password } = req.body;
        password = await bcryptjs.hash(password, 10);
        let userID = req.user.userID;
        await User.updateOne({ userID }, {
            $set: {
                password
            }
        })
        res.status(200).json({ message: "Password changed!" });
    } catch (error) {
        res.status(400).json({ error: "Something went wrong!" });
    }
})

router.delete('/deleteprofile', authUser, async (req, res) => {
    try {
        let userID = req.user.userID;
        await User.deleteOne({ userID });
        let postedBy=userID;
        await Post.deleteMany({postedBy});
        res.status(200).json({ message: "User deleted!" });
    } catch (error) {
        res.status(400).json({ error: "Something went wrong!" });
    }
})

router.post('/createpost',authUser, async (req, res) => {
    try {
        const { title, content } = req.body;
        let postedBy = req.user.userID;
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let postID = "";
        const charactersLength = characters.length;

        while (true) {
            for (let i = 0; i < 6; i++) {
                postID += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            let checkPost = await Post.findOne({ postID });
            if (checkPost != null) {
                postID = "";
                continue;
            } else {
                break;
            }
        }
        console.log("Hi1");
        const post = new Post({title,content,postID,postedBy});
        console.log("Hi1");
        await post.save();
        console.log("Hi1");
        res.status(201).json({message:"Post created!"});
    } catch (error) {
        res.status(400).json({ error: "Post can not be created!" });
    }
})

router.get('/ownposts',authUser,async(req,res)=>{
    try {
        const postedBy=req.user.userID;
        const posts=await Post.find({postedBy});
        await posts.reverse();
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).json({ error: "Can not get own posts!" });
    }
})

router.patch('/likeunlike',authUser,async(req,res)=>{
    try {
        const {postID}=req.body;
        const userID=req.user.userID;
        const post=await Post.findOne({postID});
        let isLiked=false;
        for(let i=0;i<post.reactedBy.length;i++){
            if(post.reactedBy[i].userID==userID){
                isLiked=true;
                break;
            }
        }
        if(!isLiked){
            await Post.updateOne({postID},{
                $push:{
                    reactedBy:{userID}
                }
            })
            res.status(200).json({message:"Post liked!"});
        }
        else{
            await Post.updateOne({postID},{
                $pull:{
                    reactedBy:{userID}
                }
            })
            res.status(200).json({message:"Post unliked!"});
        }
    } catch (error) {
        res.status(400).json({ error: "Can not like or unlike post!" });
    }
})

router.patch('/followunfollow',authUser,async(req,res)=>{
    try {
        const {userID}=req.body;
        let isFollowing=false;
        for(let i=0;i<req.user.following.length;i++){
            if(req.user.following[i].userID==userID){
                isFollowing=true;
                break;
            }
        }
        if(userID===req.user.userID){
            res.status(400).json({ error: "You can not follow yourself!" });
        }
        else if(isFollowing==false){
            await User.updateOne({userID:req.user.userID},{
                $push:{
                    following:{userID}
                }
            })
            await User.updateOne({userID},{
                $push:{
                    followers:{userID:req.user.userID}
                }
            })
            res.status(200).json({message:"User followed!"})
        }
        else{
            await User.updateOne({userID:req.user.userID},{
                $pull:{
                    following:{userID}
                }
            })
            await User.updateOne({userID},{
                $pull:{
                    followers:{userID:req.user.userID}
                }
            })
            res.status(200).json({message:"User unfollowed!"});
        }
    } catch (error) {
        res.status(400).json({ error: "Can not follow or unfollow post!" });
    }
})

module.exports = router;