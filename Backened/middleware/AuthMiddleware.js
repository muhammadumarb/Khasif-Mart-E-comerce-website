const jwt = require('jsonwebtoken')


exports.Auth = (req,res,next)=>{
    try{
   const token = req.cookies.token
   if(!token){
      return res.status(401).json({
        mess:"no token provide"
       })
    }
       const decode = jwt.verify(token,process.env.SECRET_KEY)
       console.log("decode",decode);
       
       req.user = decode
    next()
}  catch(err){
        return res.status(401).json({
            message:"expired Token"
        })
    }
}
exports.AdminOnly = (req,res,next)=>{
      console.log("ROLE:", req.user.role);

 if(req.user.role !== "admin"){
    res.status(403).json({
        mess:"Only Acess Admin not User"
    })
 }
 next()
}