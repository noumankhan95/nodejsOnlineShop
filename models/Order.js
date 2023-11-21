const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    products: [{
        id: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        colors: { type: String, required: true },
    }],
    totalamount: { type: Number, required: true },
    address: { type: String, required: true }
}, { timestampes: true })

module.exports = mongoose.model("order", orderSchema)