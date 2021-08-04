const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userID:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email !");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,10);
    }
    next();
})

userSchema.methods.generateToken=async function(){
    try {
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES});
        return token;
    } catch (error) {
        throw new Error("Token is not generated!");
    }
}

userSchema.methods.generateTempToken=async function(){
    try {
        console.log(process.env.TEMP_TOKEN)
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.TEMP_TOKEN});
        return token;
    } catch (error) {
        console.log("Temp-token can not be generated!");
        throw new Error("Token is not generated!");
    }
}

userSchema.methods.comparePasswords=async function(password){
    try {
        return await bcryptjs.compare(password,this.password);
    } catch (error) {
        return false;
    }
}

const User=new mongoose.model("varusers",userSchema);

module.exports=User;