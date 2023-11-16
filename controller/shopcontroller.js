const Product = require("../models/Product")
exports.getProducts = async (req, res, next) => {
    try {
        let docs = await Product.find({})
        return res.status(200).json({ status: 1, data: { docs } })
    } catch (e) {
        return res.status(400).json({ status: 0, message: e })
    }
}


exports.createProduct = async (req, res, next) => {
    try {
        console.log("Here")
        const { name, price, colors } = req.body
        console.log(req.body)
        let result = await Product.create({ name, price, colors })
        console.log(result)
        return res.status(200).json({ status: 1, data: "Product Created Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 0, message: e })

    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.body
        let result = await Product.findByIdAndRemove(id)
        console.log(result)
        return res.status(200).json({ status: 1, data: "Product Deleted Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 0, message: e })
    }
}