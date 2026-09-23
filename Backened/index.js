require('dotenv').config()
console.log("ENV CHECK:", process.env.MAIL_USER, process.env.MAIL_PASS?.length);
const express = require('express')
const connectDB = require('./confiq/db')
const app = express()
const cors = require('cors')

connectDB()

const cookieParser = require("cookie-parser");

const authRouter= require('./router/Authrouter')
const Products = require('./router/Product')
const Category = require('./router/Category')
const Card = require('./router/Cart')
const Order = require('./router/Order')



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/product',Products)
app.use('/category',Category)
app.use("/card",Card)
app.use('/order',Order)


app.listen(4000,()=>{
    console.log("Server Runing port is 4000");


    
})