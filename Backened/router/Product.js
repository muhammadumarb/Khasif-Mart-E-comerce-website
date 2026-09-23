const express = require('express')
const router = express.Router()
const {Auth,AdminOnly} = require('../middleware/AuthMiddleware')
const {Createproduct,
     getAllProduct,
     getProductId,
     getProductUpdate,
     getProductDelete,
     getproductSearch,
     getProductsByCategory
    } 
    = require('../controller/Product')

router.get('/product',getAllProduct)
router.get('/product/search',getproductSearch)
router.get('/product/:id',getProductId)
router.get('/product/category/:category',getProductsByCategory)

router.post('/product',Auth,AdminOnly,Createproduct)
router.put('/product/:id',Auth,AdminOnly,getProductUpdate)
router.delete('/product/:id',Auth,AdminOnly, getProductDelete)

module.exports=router