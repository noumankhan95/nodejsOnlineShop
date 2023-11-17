const router = require("express").Router()
const usercontroller = require("../controller/usercontroller.js")
const jwtUtil = require("../middlewares/jwttoken.js")
const { body } = require("express-validator")
router.post("/api/user/userlogin", body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 6 }), usercontroller.userLogin) //user login
router.post("/api/user/createOrder", jwtUtil.verifyToken, usercontroller.createOrder)
exports.router = router