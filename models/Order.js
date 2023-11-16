const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    products: [{
        productId: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        color: { type: String, required: true },
    }],
    totalamount: { type: Number, required: true },
    address: { type: String, required: true }
}, { timestampes: true })

module.exports = mongoose.model("order", orderSchema)