const express=require('express');
const User=require('../models/User');
const authUser=require('../middlewares/authUser');

const router=express.Router();

router.get('/',authUser,(req,res)=>{
    res.status(200).send(req.user);
})

module.exports=router;