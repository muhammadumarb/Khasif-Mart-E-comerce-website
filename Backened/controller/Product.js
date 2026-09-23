const products = require("../model/Product");



exports.Createproduct = async (req,res)=>{
 const {name,price,description,stock,image,category}= req.body
 console.log(req.body);
 
try{
 const product = await products.create({
    name,
    price,
    description,
    stock,
    image,
    category
 })
 res.status(201).json({
    mess:"Product created successfully",
    product
 })
}catch(err){
 res.status(500).json({
    message:err.message
 })
}
}
exports.getProductsByCategory = async (req, res) => {
    try {

        const { category } = req.params;

        const product = await products.find({
            category: category
        });

        res.status(200).json({
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
exports.getproductSearch = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i"
      };
    }
console.log("QUERY:", query);
    const Product = await products.find(query);

    res.status(200).json({
      Product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.getAllProduct=async (req,res)=>{
    try{
      const product = await products.find()
      res.status(200).json({
        mess:"Get All Product",
        product
      })
    }catch(err){
    res.status(500).json({
        message:err.message
    })
    }
}

exports.getProductId=async (req,res)=>{
    try{
      const product = await products.findById(req.parms.id)
      if(!product){
        res.status(404).json({
            message:"This product not found"
        })
      }

      res.status(200).json({
        mess:"Get Product",
        product
      })
    }catch(err){
    res.status(500).json({
        message:err.message
    })
    }
}

exports.getProductUpdate=async (req,res)=>{
    try{
      const product = await products.findByIdAndUpdate(
        req.parms.id,
        req.body,
        {
            new:true,
            runValidators:true
        }
      )
      if(!product){
        res.status(404).json({
            message:"This product not found"
        })
      }

      res.status(200).json({
        mess:"Upadate Product",
        product
      })
    }catch(err){
    res.status(500).json({
        message:err.message
    })
    }
}
exports.getProductDelete=async (req,res)=>{
    try{
      const product = await products.findByIdAndDelete(req.parms.id,)

      if(!product){
        res.status(404).json({
            message:"This product not found"
        })
      }

      res.status(200).json({
        mess:"Delete Successfully",
        product
      })
    }catch(err){
    res.status(500).json({
        message:err.message
    })
    }
}
