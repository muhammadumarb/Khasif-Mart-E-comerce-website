const exxpress = require('express')
const router = exxpress.Router();
const {CreateCategory,
    getAllCategory,
    getDeleteCategory,
    getSingleCategory,
    getUpdateCategory
} = require('../controller/Category')
const {Auth,AdminOnly} = require('../middleware/AuthMiddleware')


router.get("/category",getAllCategory)
router.get("/category/:id",getSingleCategory)
router.post("/category", Auth, AdminOnly, CreateCategory)
router.put("/category/:id",Auth, AdminOnly, getUpdateCategory)
router.delete("/category/:id",Auth, AdminOnly, getDeleteCategory)


module.exports = router;