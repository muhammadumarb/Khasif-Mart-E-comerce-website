const categoryModel = require('../model/Category')


exports.CreateCategory = async(req,res)=>{
    console.log("category :",req.body);
    
   const { name, description, image } = req.body;
   try{

       const category = await categoryModel.create({
        name,
        description,
        image
       })
       res.status(201).json({
        mess:"Category Created Successfully",
        category
        
      })
     
   }catch(err){
      res.status(500).json({
      message: err.message,
      });
   };
}

exports.getAllCategory = async (req,res)=>{
    try{

        const category = await categoryModel.find()
        res.status(200).json({
          mess:"Get All Category",
          category
        })
    }catch(err){
      res.status(500).json({
        mess:err.message
      })
    }
}

exports.getSingleCategory = async (req,res)=>{
    try{

        const category = await categoryModel.findById(req.parms.id)
        res.status(200).json({
          mess:"Get Single  Category",
          category
        })
    }catch(err){
      res.status(500).json({
        mess:err.message
      })
    }
}

exports.getUpdateCategory = async (req,res)=>{
    try{

        const category = await categoryModel.findByIdAndUpdate(
            req.parms.id,
            req.body,{
                new:true,
                runValidators:true
            }
        )
          if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    } 

        res.status(200).json({
          mess:"Update  Category",
          category
        })
    }catch(err){
      res.status(500).json({
        mess:err.message
      })
    }
}

exports.getDeleteCategory = async (req,res)=>{
    try{

        const category = await categoryModel.findByIdAndDelete(
            req.parm.id
        )
          if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    } 
    
        res.status(200).json({
          mess:" Delete Category",
         category
        })
    }catch(err){
      res.status(500).json({
        mess:err.message
      })
    }
}