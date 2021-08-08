const express=require('express');
const router=express.Router();
const User=require('../models/User');
const sendEmail=require('../utils/sendEmail');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');
const Post=require('../models/Post');

router.get('/',(req,res)=>{
    res.status(200).send("Welcome to home!");
})

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name.trim() != "" || email.trim() != "" || password.trim() != "") {
            const characters ="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let userID = "";
            const charactersLength = characters.length;

            while (true) {
                for (var i = 0; i < 5; i++) {
                    userID += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                let checkUser = await User.findOne({ userID });
                if (checkUser != null) {
                    userID = "";
                    continue;
                } else {
                    break;
                }
            }
            console.log("hi1");
            const user = new User({ name, userID, email, password });
            await user.save();
            console.log("hi2");
            const token = await user.generateTempToken();
            console.log("hi3");
            sendEmail({
                user:user.email,
                subject:"Verify email",
                html:`<h1>Registration successful</h1><br><h4>Welcome to our website VARs ${user.name}. Click on the following button to verify your email.</h4><br><a href="http://localhost:3000/verifyemail/${token}" target="_blank"><button style="color: white;background: purple;cursor: pointer;">Click here to verify email</button></a>`
            })
            res.status(201).json({ message: "User created!" });
        }
        else {
            res.status(400).json({ error: "Please enter all the details!" });
        }
    } catch (error) {
        res.status(400).json({ error: "Something went wrong!" })
    }
})

router.get('/verify/:token',async(req,res)=>{
    try {
        const token=req.params.token;
        console.log("hi1");
        const verifiedToken=await jwt.verify(token,process.env.SECRET_KEY);
        const user= await User.findOne({_id:verifiedToken._id});
        if(!user){
            res.status(401).json({error:"User doesn't exist!"});
        }
        else{
            let userID=user.userID;
            let verified=true;
            await User.updateOne({userID},{
                $set:{
                    verified
                }
            })
            res.status(201).json({message:"User verified!"});
        }
    } catch (error) {
        res.status(400).json({error:"Something went wrong!"})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("hi1");
        if(!email.trim() || !password.trim()){
            res.status(400).json({ error: "Please enter all the details!" });
        }
        else{
            const user=await User.findOne({email});
            console.log("hi2");
            if(!user){
                res.status(400).json({ error: "User not found!" });
            }
            else if(user.verified==false){
                res.status(401).json({error:"User is not verified!"});
            }
            else{
                const checkPass=await user.comparePasswords(password);
                console.log("hi3");
                if(!checkPass){
                    res.status(400).json({error:"Invalid credentials!1"});
                }
                else{
                    console.log("hi4");
                    const token = await user.generateToken();
                    res.status(201).send(token);
                    console.log(user);
                }
            }
        }

    } catch (error) {
        res.status(401).json({ error: "Invalid credentials!2" });
    }
})

router.post('/forgotpassword',async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({email});
        if(user.verified==false){
            res.status(401).json({error:"User is not verified!"});
        }
        else{
            const token = await user.generateToken();
            sendEmail({
                user:user.email,
                subject:"Reset password",
                html:`<h1>Reset password</h1><br><h4>Click on the following button to reset your password.</h4><br><a href="http://localhost:3000/resetpassword/${token}" target="_blank"><button style="color: white;background: purple;cursor: pointer;">Reset password</button></a>`
            })
            res.status(200).json({message:"Mail sent!"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Something went wrong!"});
    }
})

router.post('/resetpassword/:token',async(req,res)=>{
    try {
        const token=req.params.token;
        let {password}=req.body;
        password = await bcryptjs.hash(password,10);
        console.log("hi1");
        const verifiedToken=await jwt.verify(token,process.env.SECRET_KEY);
        const user= await User.findOne({_id:verifiedToken._id});
        if(!user){
            res.status(401).json({error:"User doesn't exist!"});
        }
        else{
            let userID=user.userID;
            await User.updateOne({userID},{
                $set:{
                    password
                }
            })
            res.status(200).json({message:"Password updated!"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Something went wrong!"});
    }
})

router.get('/allposts',async(req,res)=>{
    try {
        const posts=await Post.find();
        await posts.reverse();
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).json({error:"Can not get posts!"});
    }
})


module.exports=router;