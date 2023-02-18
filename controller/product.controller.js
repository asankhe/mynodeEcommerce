import Product from '../model/product.model'
import multer from 'multer'
import fs from 'fs'

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const randomDate = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + randomDate+'.png')
    }
  })

const upload = multer({ storage: storage1 }) //// directly attached in addProduct & updateProduct <- myPersonalNotes

export const getProducts = async (req,res) =>{

    try {
        const {sort,q} = req.query;

        let sortvalue = 1;
        if(sort == 'htl'){
            sortvalue = -1;
        }
        let data = [];
        if(q){
             data = await Product.find(
                { 
                $or:[{"name": { $regex: '.*' + q + '.*', $options: 'i' }},
                {"description": { $regex: '.*' + q + '.*', $options: 'i'}}]},
                ).populate('category').sort({price:sortvalue});
        }else{
             data = await Product.find().populate('category').sort({price:sortvalue});

        }
 
         res.status(200).json({
             data:data,
             message:'Successfully fetched!',
             path:'http://localhost:7070/uploads/'

         })
    } catch (error) {
         res.status(400).json({
             message:error.message,
         })
    }
 }

 
export const addProduct =(req,res)=>{
    try {
        console.log(req.body)
        const imageStore =  upload.single('image');
        imageStore(req,res, async function(err){
            if(err){
                res.status(400).json({
                    message:err.message
                })
            }
            console.log()


            const {nameS,categoryS,priceS,quantityS,descriptionS} = req.body; //destructuring

            // img = "";
            // if(req.file.filename){
            //     img = req.file.filename
            // }
 
            const prodData = new Product({
                name: nameS,
                category: categoryS,
                price: priceS,
                quantity: quantityS,
                description: descriptionS,
                image: req.file.filename,
                // image: img,
            }); //creating object
            const saveData = prodData.save(); //save data in db

            if(prodData){
                res.status(201).json({
                    data:prodData,
                    message:'Successfully data inserted!',
                    path:'http://localhost:7070/uploads/'
                }) 
            }

            })
       
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}


export const getProduct = async (req,res) =>{
    try {
        const productID = req.params.product_id;
        const data = await Product.findOne({_id:productID}).populate('category'); //.populate for saved objectId into the database to convert category name on front-end
        if(data){
            res.status(200).json({
                data:data,
                message:'Single Category data!',
                path:'http://localhost:7070/uploads/'
            })
        }
   } catch (error) {
        res.status(400).json({
            message:error.message
        })
   }
}

export const deleteProduct = async (req,res) =>{
    try {
        const productID = req.params.product_id;
        const proData = await Product.findOne({_id:productID});
        const data = await Product.deleteOne({_id:productID})

        if(data.acknowledged){
            fs.unlinkSync('./uploads/'+proData.image)
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

export const updateProduct = async (req,res) =>{

    try {
        
        const imageStore =  upload.single('image');
        imageStore(req,res, async function(err){
            if(err){
                res.status(400).json({
                    message:err.message
                })
            }

            const productID = req.params.product_id;
            const {nameS,categoryS,priceS,quantityS,descriptionS} = req.body; //destructuring
            const proData = await Product.findOne({_id:productID});
            let img = ''
            if(req?.file?.filename){
                img = req.file.filename
                fs.unlinkSync('./uploads/'+proData.image)
            }else{
                img = proData.image;
            }
            const updateProduct = await Product.updateOne({_id:productID},{$set:
                {
                    name:nameS,
                    category:categoryS,
                    price:priceS,
                    quantity:quantityS,
                    description:descriptionS,
                    image:img,
                }})
         
            if(updateProduct.acknowledged){
                res.status(200).json({
                    message:'updated data inserted!',
                }) 
            }

            })
       
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    } 
}
