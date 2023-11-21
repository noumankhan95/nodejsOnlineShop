const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    admin: {
        required: true,
        type: Boolean,
        default: false
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;