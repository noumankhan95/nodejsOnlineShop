const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        res = await mongoose.connect('mongodb://127.0.0.1:27017/onlineshop', {
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 5000,
        })
        console.log("DataBase Connected")
    } catch (e) {
        console.log(e)
        throw new Error({ status: 0, message: e })
    }
}
module.exports = dbConnect