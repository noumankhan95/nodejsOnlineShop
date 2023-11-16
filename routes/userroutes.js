const router = require("express").Router()
const usercontroller = require("../controller/usercontroller.js")
const jwtUtil = require("../middlewares/jwttoken.js")
router.post("/api/user/userlogin", usercontroller.userLogin) //user login
router.post("/api/user/createOrder", jwtUtil.verifyToken, usercontroller.createOrder)
exports.router = router