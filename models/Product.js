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
    category: { type: String },
    colors: [{ type: String }],
    imgurl: [{ type: String, required: true }]
}, { timestamps: true })

module.exports = mongoose.model("Product", ProductSchema)