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
        let user = await User.findOne({ email: decoded.user.email })
        let { _id: id, name, email, admin, orders } = user
        req.user = { id, name, email, admin, orders }
        if (decoded.admin) {
            if (user && user.admin) { req.user.admin = true } else {
                req.user.admin = false
            }
        }
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({ status: 0, data: { message: "Authentication Error Forbidden" + e } })
    }
}