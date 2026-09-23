const express = require('express')
const router = express.Router()
const {addToCart,getCart,updateCart,removeFromCart} = require('../controller/Cart')
const {Auth,AdminOnly} =require('../middleware/AuthMiddleware')


router.get("/card",Auth,  getCart)
router.post("/card", Auth, addToCart)   
router.put("/card/:id", Auth, updateCart)
router.delete("/card/:id", Auth, removeFromCart)

module.exports = router;