const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator")
exports.admintest = (req, res) => {
    console.log(req.user)
    return res.status(200).json({ Message: "Send" })
}

exports.userasAdminLogin = async (req, res) => {
    try {
        const validationerrors = validationResult(req)
        if (!validationerrors.isEmpty()) {
            console.log(validationerrors.array())
            throw "Enter Correct Information"
        }
        const { email, password } = req.body
        let user = await User.findOne({ email })
        let isuser = await bcrypt.compare(password, user.password)
        if (!isuser || !user.admin) throw "Authentication Error"
        let token = jwt.sign({ email, name: user.name, admin: true }, "ThismyKey")
        return res.status(200).json({ status: 1, data: { message: "Success", token } })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ status: 0, data: { message: e } })
    }
}
exports.createUser = async (req, res) => {
    try {
        const validationerrors = validationResult(req)
        if (!validationerrors.isEmpty()) {
            console.log(validationerrors.array())
            throw "Enter Correct Information"
        }
        const { name, email, password, } = req.body
        const hashedPw = await bcrypt.hash(password, 12)
        const result = await User.create({ name, email, password: hashedPw })
        console.log(result)
        return res.status(200).json({ status: 1, data: "User Created Successfully" })
    } catch (e) {
        return res.status(404).json({ status: 0, data: "Couldnt create Users," + e })
    }
}

exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPw = await bcrypt.hash(password, 12)
        const result = await User.create({ name, email, password: hashedPw, admin: true })
        console.log(result)
        return res.status(200).json({ status: 1, data: "User Created Successfully" })
    } catch (e) {
        return res.status(404).json({ status: 0, data: "Couldnt create User" + e })
    }
}