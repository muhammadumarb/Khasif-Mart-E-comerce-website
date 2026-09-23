import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import axios from 'axios'
import { data, useNavigate, useParams } from 'react-router-dom'
import {Ecomerce} from '../context/context'

const Product = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    const { id, category: categoryParam } = useParams()

    const  {handleClick}  = useContext(Ecomerce);
    
    // const AddProduct = async () => {
    //     try {
            
    //         const response = await axios.post('http://localhost:4000/product/product',
    //             { name, price, description, stock, category, }
    //         )
    //         setData(response.data)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    const getProduct = async () => {
        try {
            const response = await axios.get('http://localhost:4000/product/product')
            setProduct(response.data.product)
            console.log(response.data);

        } catch (err) {
            console.log(err);
        }
    }
    
    // Fetch only products that belong to the clicked category
    const getProductsByCategory = async (categoryName) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/product/product/category/${categoryName}`
            )
            setProduct(response.data.product)
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        if (categoryParam) {
            // came here from a category click -> 
            getProductsByCategory(categoryParam)
        } else {
            // came here from navbar -> /product (show everything)
            getProduct()
        }
    }, [categoryParam])
    const getProductById = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/product/product/${id}`,)
            setData(response.data)
        } catch (err) {
            console.log(err);
        }
    }
    const getUpdateProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/product/product/${id}`,)
            setData(response.data)
        } catch (err) {
            console.log(err);
        }
    }
    const getDeleteProduct = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/product/product/${id}`,)
            setData(response.data)
        } catch (err) {
            console.log(err);
        }
    }
    
   
     




    return (
<div className="product">

    <div className="product_heading">
        <h1>{categoryParam ? `${categoryParam} Products` : "Popular Products"}</h1>
        {categoryParam && (
            <button onClick={() => navigate('/product')}>
                View All Products
            </button>
        )}
    </div>

    <div className="product_grid">


        {product.map((item) => {
            return (
                <div
                    key={item._id}
                    className="product_item"
                >

                    <div className="product_image">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                            />
                        ) : (
                            <div className="image_placeholder">
                                🛒
                            </div>
                        )}
                    </div>

                    <div className="product_content">

                        <h2>{item.name}</h2>

                        <p>{item.description}</p>

                        <h3>Rs {item.price}</h3>

                        <button onClick={()=>handleClick(item._id)}>
                            Add to cart
                        </button>

                    </div>

                </div>
            );
        })}

    </div>
</div>    )
}

export default Product