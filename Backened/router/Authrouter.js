const express = require('express')
const router = express.Router()
const {Register,Login,logout,getUserME} = require('../controller/Auth')
const {Auth,AdminOnly} = require('../middleware/AuthMiddleware')


router.post("/register",Register)
router.post("/login",Login)
router.get('/me',Auth,getUserME)
router.post("/logout",logout)


module.exports = router