const mongoose = require("mongoose")
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    colors: [{ type: String }]
}, { timestamps: true })

module.exports = mongoose.model("Product", ProductSchema)