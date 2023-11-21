const router = require("express").Router()
const usercontroller = require("../controller/usercontroller.js")
const jwtUtil = require("../middlewares/jwttoken.js")
const { body } = require("express-validator")
router.post("/api/user/userlogin", body("name").isString(), body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 6 }), usercontroller.userLogin) //user login
router.post("/api/user/createOrder", jwtUtil.verifyToken, usercontroller.createOrder)
router.post("/api/user/verifyToken", jwtUtil.verifyToken, usercontroller.verifyToken)
router.get("/api/user/getOrders", jwtUtil.verifyToken, usercontroller.getOrders)
exports.router = router