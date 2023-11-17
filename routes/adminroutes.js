const router = require("express").Router()
const adminController = require("../controller/admincontroller.js")
const shopcontroller = require("../controller/shopcontroller.js")
const { body } = require("express-validator")
const jwtUtil = require('../middlewares/jwttoken.js')
router.get("/api/admin", jwtUtil.verifyToken, adminController.admintest)
router.post("/api/admin/createProduct", jwtUtil.verifyToken, shopcontroller.createProduct)
router.post("/api/admin/createmyshopsadmin", adminController.createAdmin) //creating admin
router.post("/api/admin/deleteProduct", jwtUtil.verifyToken, shopcontroller.deleteProduct)
router.post("/api/admin/signUp", body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 6 }), body("name").isLength({ min: 5 }), adminController.createUser) //creating simple user
router.post('/api/admin/userlogin', body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 6 }), adminController.userasAdminLogin) //admin login
exports.router = router
