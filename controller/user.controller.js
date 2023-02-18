import User from "../model/user.model";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUser = async (req,res) =>{
   try {
        const data = await User.find();
        
        res.status(200).json({
            data:data,
            message:'Successfully fetched!'
        })
   } catch (error) {
        res.status(400).json({
            message:error.message
        })
   }
}
export const addUser =(req,res)=>{
    try {

        const {name1,email1} = req.body; //destructuring

        const userData = new User({name:name1,email:email1}); //creating object
        const saveData = userData.save(); //save data in db

        if(userData){
            res.status(201).json({
                data:userData,
                message:'Successfully data inserted!'
            }) 
        }

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

export const getSingleUser = async (req,res) =>{
    try {
        const userID = req.params.user_id; //getting user_id from url
        const data = await User.findOne({_id:userID});
        if(data){
            res.status(200).json({
                data:data,
                message:'Single user data!'
            })
        }
   } catch (error) {
        res.status(400).json({
            message:error.message
        })
   }
}
export const deteleUser = async (req,res) =>{
    try {
        const userId = req.params.user_id;
        const data = await User.deleteOne({_id:userId})
        if(data.acknowledged){
            res.status(200).json({
                message:'Deleted Successfully'
            })
        }
    }
    catch (error) {
        res.status(400).json({
            message:error.message
        })
   }
}

export const updateUser = async (req,res) =>{
    try {
        const userId = req.params.user_id;
        const {name1,email1} = req.body;
        const updateUser = await User.updateOne({_id:userId},{$set:{name:name1,email:email1}})
        if(updateUser.acknowledged){
            res.status(200).json({
                message:'Update Successfully'
            })
        }
    }
    catch (error) {
        res.status(400).json({
            message:error.message
        })
   }
}


// Auth
export const Signup = async(req,res)=>{
    try {

        const {name,email,password,contact} = req.body; //destructuring

        const existUser = await User.findOne({email:email});

        if(existUser){
            return res.status(400).json({
                message:"User already exist!"
            })
        }
        const hashPassword = await bcryptjs.hash(password,12)
        const userData = new User({name:name,email:email,password:hashPassword,contact:contact}); //creating object
        const saveData = userData.save(); //save data in db

        if(userData){
            res.status(201).json({
                data:userData,
                message:'Successfully data inserted!'
            }) 
        }

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body; //destructuring

        const existUser = await User.findOne({email:email});

        if(!existUser){
            return res.status(400).json({
                message:"User doesn't exist!"
            })
        }
        const isPasswordCorrect = await bcryptjs.compare(password,existUser.password);
        
        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Invalid credential!"
            })
        }

        const token = jwt.sign({email:existUser.email,id:existUser._id},'secretkey',{expiresIn:'1h'})

        res.status(200).json({
            data:existUser,
            token:'Bearer '+token,
            message:'Successfully Login!'
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}