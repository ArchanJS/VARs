const express=require('express');
const router=express.Router();
const User=require('../models/User');
const sendEmail=require('../utils/sendEmail');
const jwt=require('jsonwebtoken');

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

module.exports=router;