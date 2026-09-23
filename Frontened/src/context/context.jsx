import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Ecomerce = createContext();

const Context = ({ children }) => {
  const navigate = useNavigate()
    const [loading,setLoading] =useState(false) 
     const [user,setUser] = useState([])
  const [count, setCount] = useState(JSON.parse(localStorage.getItem("count")) || 0);
     const [cart, setCart] = useState([]);
   const [search,setSearch] = useState('')
   const [data ,setData] = useState([])
  useEffect(()=>{
  localStorage.setItem("count",JSON.stringify(count))
  },[count])
  const getCart = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/card/card",
      {
        withCredentials: true,
      }
    );

    setCart(response.data.cart.items);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};
useEffect(() => {
  getCart();
}, []);

   const SearchProduct = async ()=>{
  const response = await axios.get(`http://localhost:4000/product/product/search?search=${search}`)

  console.log(response.data)
  setData(response.data.Product)

  navigate('/search')
 }
    const handleClick = async (id) => {
           try {
               const response = await axios.post(
                   "http://localhost:4000/card/card",
                   {
                       productId: id,
                       quantity: 1
                      },
                      {
                          withCredentials: true
                      }
                  );
               setCart(response.data.cart.items);
         if (response.data.isNew) {
             setCount(count+ 1);
         }
 
              console.log(response.data);
      // navigate('/cart')
          } catch (error) {
              console.log(error.response?.data || error.message);
          }
      };

   const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/auth/me",
      {
        withCredentials: true
      }
    );

    setUser(response.data.user);
  } catch (error) {
    setUser(null);
    console.log(error.response?.data || error.message);
  }
};
      
useEffect(()=>{
getCurrentUser()
},[])
 

  return (
    <Ecomerce.Provider value={{ count, setCount ,setLoading,loading ,search,setSearch,data,setData,SearchProduct,handleClick,setUser,user,setCart,cart}}>
      {children}
    </Ecomerce.Provider>
  );
};

export default Context;