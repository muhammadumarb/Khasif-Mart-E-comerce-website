const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim:true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
         },

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("Product", productSchema);

module.exports = products;