import React, { useEffect, useState } from 'react'
import './Category.css'
import axios from 'axios'
import { FaUser } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const Category = () => {
    const [name,setName] = useState('')
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState([])
    const navigate = useNavigate()

    const getCategory =  async()=>{
        try{
            const response = await axios.get("https://khasifmartecomercewebsite1-okf5fcgf.b4a.run/category/category")
            setCategory(response.data.category)
            console.log(response.data);

        }catch(err){
         console.log(response.data.message);
         
        }
      

    }
    useEffect(()=>{
      getCategory()
    },[])

    const icons = {
           Grocery: <MdOutlineLocalGroceryStore  className='ico' color='#F2A93B'/>,
           Home: <FaRegStar className='ico' color='#F2A93B'/>,
            PersonalCare: <FaUser className='ico' color='#F2A93B'/>,
            Refreshments:<IoBag className='ico' color='#F2A93B'/>
    }
    

  return (
    <div>
        <div className="heading">
            <h1 className='category__heading'>Category by Store</h1>
            <div className="category_grid">
            {category.map((item)=>(
     <div onClick={() => navigate(`/product/category/${item.name}`)}
      key={item._id} className='category_boxes'>
                <div className="category_box">
                  
                    <h3>{icons[item.name]}</h3>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </div>

            </div>
            ))}
  </div>
           
        </div>
    </div>
  )
}

export default Category