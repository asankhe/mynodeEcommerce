import mongoose from "mongoose";

const Category = new mongoose.Schema({
    name: { 
        type: String,
        require:true
    },
    alias:{
        type:String,
        require:true
    }
   
  });

export default mongoose.model('Category',Category)
