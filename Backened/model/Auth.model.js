const mongoose = require('mongoose')

const Authschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
      type:String,
        required:true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password:{
         type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true})
   

const authModel = mongoose.model("Auth",Authschema)

module.exports = authModel;
