import React, { useContext } from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import Register from './Register/Register'
import Login from './Login/Login'
import './App.css'
import Product from './Product/Product'
import ProductDetail from './ProductDetail/ProductDetail'
import Navbar from './components/Navbar/Navbar'
import Slider from './components/Slider/Slider'
import Category from './category/Category'
import Cart from './Cart/Cart'
import Search from './components/Navbar/Search/Search'
import Footer from './Footer/Footer'
import { Ecomerce } from './context/context'
import Order from './Order/Order'
import ConformOrder from './ConformOrder/ConformOrder'

const App = () => {
  const location = useLocation()
  const hideNavbar = ["/login","/","/cart","/order","/order-success"].includes(location.pathname)
  const hideslider= ['/cart',"/login","/","/search","/order","/product/category/:category","/order-success"].includes(location.pathname)
  const hideCategory = ['/cart',"/login","/","/search","/order","/product/category/:category","/order-success"].includes(location.pathname)
  const hideFooter = ["/","/login","/cart" ,"/order","/order-success"].includes(location.pathname)


  return (
<div >
{!hideNavbar && <Navbar/> }
{!hideslider && <Slider/>}
{!hideCategory && <Category/>}
      
  
  <Routes>
    <Route path='/' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/search' element={<Search/>}/>
     <Route path='/product/category/:category' element={<Product/>}/>
  
     <Route path='/product' element={<Product/>}/>
        <Route path='/order' element={<Order/>}/>
    <Route path='/product/:id' element={<ProductDetail/>}/>
      <Route path='/order-success' element={<ConformOrder/>}/>

  
  </Routes>
{!hideFooter && <Footer/>}

    </div>
  )
}

export default App