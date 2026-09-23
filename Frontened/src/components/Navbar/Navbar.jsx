import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import {Ecomerce} from '../../context/context'
import axios from 'axios';
import { CiLight } from "react-icons/ci";


const Navbar = () => {
  const navigate = useNavigate()
 const {count} = useContext(Ecomerce)
 const {search,setSearch} = useContext(Ecomerce)
const {SearchProduct} = useContext(Ecomerce)

const logout = async()=>{
   await axios.post("http://localhost:4000/api/auth/logout",
    {},
    {
      withCredentials:true,
    }
    
  )
navigate('/')
}




  const handleclick=()=>{
  navigate('/cart')
  }
  return (
    <div>
        <nav>
            <div className="logo">
                <h1 className='h1'>Khasif <span>Mart</span></h1>
            </div>
            <div className="searchbar">
                <input type="text" placeholder='Search for groceries, snacks, essentials…'
                value={search} onChange={(e)=>setSearch(e.target.value)}
                />
                <CiSearch onClick={SearchProduct} size={47} className='search' />
            </div>
            <div className="cart">
            
              <div className="iconCart">
               
              <FaShoppingCart onClick={handleclick} className='cart' size={26} color='white'/>
              <p className='p'>card</p>
              <span  className='circle'>{count}</span>
              </div>
              <button className="btnn" onClick={logout}  >
                 <FiLogOut size={24} color='white'/>
                Log out
              </button>
              
            </div>
        </nav>

    </div>
  )
}

export default Navbar