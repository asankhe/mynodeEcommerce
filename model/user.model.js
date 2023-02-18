import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: { 
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contact:{
        type:Number
    }
   
  });

export default mongoose.model('User',User)
