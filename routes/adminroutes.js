const router = require("express").Router()
const adminController = require("../controller/admincontroller.js")
const shopcontroller = require("../controller/shopcontroller.js")
const jwtUtil = require('../middlewares/jwttoken.js')
router.get("/api/admin", jwtUtil.verifyToken, adminController.admintest)
router.post("/api/admin/createProduct", shopcontroller.createProduct)
router.post("/api/admin/createmyshopsadmin", adminController.createAdmin) //creating admin
router.post("/api/admin/deleteProduct", shopcontroller.deleteProduct)
router.post("/api/admin/signUp", adminController.createUser) //creating simple user
router.post('/api/admin/userlogin', adminController.userasAdminLogin) //admin login
exports.router = router
