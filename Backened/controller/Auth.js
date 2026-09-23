const authModel = require('../model/Auth.model')
const jwt = require('jsonwebtoken')
 const bcrypt = require('bcrypt')


 exports.Register = async(req,res)=>{
    const {name,email,password,role} = req.body
    

    const Isexisting = await authModel.findOne({email})
    
    if(Isexisting){
      return res.status(401).json({
        mess:"User Already Register"
      })
    }
    try{
      const hashedpassword = await bcrypt.hash(password,10)
    const user = await authModel.create({
        name,
        email,
        password:hashedpassword,
        role
    })
    // const token = jwt.sign({
    //   id:user._id
    // },process.env.SECRET_KEY)

    // res.cookie("token",token)

   res.status(201).json({
        mess:"User Register Successfully",user
      })

 }catch(err){
   res.status(500).json({
    mess:`This is server ${err}`
   })

}
 }
exports.Login =async(req,res)=>{
  const {email,password} = req.body
   const user = await authModel.findOne({email})

   if(!user){
    return res.status(401).json({
      mess:"Login crenditional Wrong "
     })
   }
   try{
    const comparepassword = await bcrypt.compare(password,user.password)

    if (!comparepassword) {
  return res.status(401).json({
    mess: "Wrong password"
  });
}

   const token = jwt.sign({
    id:user._id,
    role: user.role
   },process.env.SECRET_KEY,{expiresIn:"7d"})

res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false
});

    res.status(200).json({
    mess:"Login Successfully",
    user
   })
   

  }catch(err){
    res.status(500).json({
      mess:`Server error ${err}`
    })
  }
}

exports.getUserME = async(req,res)=>{
   const user = await  authModel.findById(req.user.id)
   if(!user){
    return res.status(404).json({
      mess:"user Not Found"
    })
   }
   try{

     res.status(200).json({
      mess:"User FInd With Id",
      user
     })
   }catch(err){
    res.status(500).json({
      mess:err.mess
    })

   }
}

exports.logout =(req,res)=>{
 res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  })

  res.status(200).json({
    message: "Logout successful"
  })
}