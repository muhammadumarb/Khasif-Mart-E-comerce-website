const mongoose =  require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
      items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        quantity: {
          type: Number,
          required: true
        },

        price: {
          type: Number,
          required: true
        }
      }
    ],

    username:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    Address:{
        type:String,
       
    },
    totalAmount:{
        type:String,
        required:true
    },
},{timestamps:true})

const Ordermodel = mongoose.model("Order",orderSchema)

module.exports = Ordermodel;