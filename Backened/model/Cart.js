const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref: "Auth",
       required:true
    },
    items:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
              type:Number,
              required:true
            }
        }
    ]
},{timestamps:true})

const Cardmodel = mongoose.model("Card",cartSchema)

module.exports = Cardmodel;