const Order = require("../models/Order")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator')
exports.createOrder = async (req, res) => {
    try {
        const { products, totalamount, address } = req.body
        console.log(req.body)
        console.log(req.user)

        let result = await Order.create({ userId: req.user.id, products, totalamount, address })
        let response = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { orders: result._id } }, { upsert: true, new: true })
        console.log(response)
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
        console.log(user)
        if (!user) throw "No User Exists"
        let isuser = await bcrypt.compare(pw, user.password)
        if (!isuser) throw "Authentication Error"
        const token = jwt.sign({ user: { email, name: user.name, id: user._id, admin: user.admin } }, "ThismyKey", { expiresIn: '1h' })
        return res.status(200).json({ status: 1, data: { message: "Success", email: user.email, name: user.name, token, admin: user.admin } })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 0, data: { message: e } })
    }
}

exports.verifyToken = async (req, res) => {
    try {
        return res.status(200).json({ status: 1, data: { message: "Success", user: req.user } })
    } catch (e) {
        return res.status(403).json({ status: 1, data: { message: "Forbidden" } })

    }
}

exports.getOrders = async (req, res) => {
    try {

        return res.status(200).json({ status: 1, data: { message: "Success", orders: req.user?.orders } })
    } catch (e) {
        return res.status(404).json({ status: 0, data: { message: "Not Found " + e } })
    }
}