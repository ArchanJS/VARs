const express=require('express');
const User=require('../models/User');
const authUser=require('../middlewares/authUser');
const bcryptjs=require('bcryptjs');

const router=express.Router();

router.get('/',authUser,(req,res)=>{
    res.status(200).send(req.user);
})

router.patch('/updateprofile',authUser,async(req,res)=>{
    try {
        const {name} = req.body;
        let userID=req.user.userID;
        await User.updateOne({userID},{
            $set:{
                name
            }
        })
        res.status(200).json({message:"User updated!"});
    } catch (error) {
        res.status(400).json({error:"Something went wrong!"});
    }
})

router.patch('/changepassword',authUser,async(req,res)=>{
    try {
        let {password}=req.body;
        password=await bcryptjs.hash(password,10);
        let userID=req.user.userID;
        await User.updateOne({userID},{
            $set:{
                password
            }
        })
        res.status(200).json({message:"Password changed!"});
    } catch (error) {
        res.status(400).json({error:"Something went wrong!"});
    }
})

module.exports=router;