const express = require('express')
const router = express.Router()
const {createOder}=require('../controller/Order')
const {Auth} = require('../middleware/AuthMiddleware')


router.post('/order',Auth, createOder)

module.exports = router