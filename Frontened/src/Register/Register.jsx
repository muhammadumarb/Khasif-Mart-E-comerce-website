import React, {  useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom'
import "./Register.css"
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";




const Register =() => {
   const navigate = useNavigate()
   const [name,setName]  = useState('');
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [data ,setData] = useState([]);

 
   const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
       const respones = await axios.post("http://localhost:4000/api/auth/register",
        {email,password,name},
       )
       setData(respones.data)


       setName("")
       setPassword("")
       setEmail("")
      
       
       navigate("/login")

    }catch(err){
       console.log(err.message);  
    }
   }
  return (
   <div className='full'>
      <div className='nav'>
         
         <FaShoppingCart size={35}   />
         <div className="text">
            <h2>Khasif <span className='spa'> Mart</span></h2>
            <p>Better Products • Better Life</p>
         </div>
      </div>
<form onSubmit={handleSubmit}>
   <div className='center'>
      <FaShoppingBag fontSize={60} />
      <h3>Create Your <span className='span'>Account</span> </h3>
      <p>Join Khasif Mart and enjoy the best shopping <br />
experience with amazing deals.</p>
   </div>
        <div className="Inputs">
         <FaUser size={18} color='#145C55' className='icon'/>
            <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} className='input' />
        </div>
           <div className="Inputs">
            <MdOutlineEmail size={18} color='#145C55' className='icon'/>
            <input type="text" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='input' />
        </div>
           <div className="Inputs">
            <RiLockPasswordLine size={18} color='#145C55' className='icon'/>
            <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='input' />
        </div>
        <button className='btn' type='submit'>Submit</button>
   
        <div className='end'>
         <p>Already have an account?</p>

       <Link className='link' to="/login">Login</Link>
        </div>
      
    </form>
   </div>
    
  )
}

export default Register