const mongoose=require('mongoose');

const db=process.env.MONGO_URI;

mongoose.connect(db,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}).then(()=>console.log("DB connected!")).catch((error)=>console.log(error));