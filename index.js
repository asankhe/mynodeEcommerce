import express from "express";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import userRouter from './router/user.router'
import categoryRouter from './router/category.router'
import productRouter from './router/product.router'
import cors from 'cors'
const app = express();

//read image in frontend 
app.use(express.json())
app.use(express.static(__dirname))

const port = 7070;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var corsOptions = {
    // origin: 'http://localhost:5000',---
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, PATCH, POST, DELETE"
}

app.use(cors(corsOptions));

app.listen(port, () =>{
    console.log(`example app listening on port ${port}`)
})

mongoose.connect('mongodb://127.0.0.1:27017/finalDatabase')
.then(()=>{
    console.log("Database successfully connnected!");
})
.catch((err)=>{
    console.log("Error: ",err)
})

app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)