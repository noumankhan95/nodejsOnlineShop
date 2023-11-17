const Order = require("../models/Order")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.createOrder = async (req, res) => {
    try {
        const { products, totalamount, address } = req.body
        let result = await Order.create({ userId: req.user._id, products, totalamount, address })
        return res.status(200).json({ status: 1, data: { message: "Ordered" } })
    } catch (e) {
        console.log(e)
        return res.status(404).json({ status: 0, data: { message: "Order Failed" } })

    }
}

exports.userLogin = async (req, res) => {
    try {
        const validationerrors = validationResult(req)
        if (!validationerrors.isEmpty()) {
            console.log(validationerrors.array())
            throw "Enter Correct Information"
        }
        const { email, password: pw } = req.body
        let user = await User.findOne({ email })
        if (!user) throw "No User Exists"
        let isuser = await bcrypt.compare(pw, user.password)
        if (!isuser) throw "Authentication Error"
        const token = jwt.sign({ user: { email, name: user.email } }, "ThismyKey", { expiresIn: '1h' })
        return res.status(200).json({ status: 1, data: { message: "Success", email, name: user.name, token } })
    } catch (e) {
        return res.status(400).json({ status: 0, data: { message: e } })
    }
}