const jwt = require("jsonwebtoken")
const User = require('../models/User')
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(req.headers.authorization.split(" ")[1])
        if (!token) {
            throw "UnAuthorized"
        }
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], "ThismyKey")
        req.user = { ...decoded }
        if (decoded.admin) {
            let user = await User.findOne({ email: decoded.email })
            if (user && user.admin) { req.user.admin = true } else {
                req.user.admin = false
            }
        }
        next()
    } catch (e) {
        console.log(e)
        return res.status(404).json({ status: 0, data: { message: "Authentication Error" + e } })
    }
}