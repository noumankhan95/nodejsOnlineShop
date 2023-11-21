const app = require('express')()
const shoproutes = require("./routes/shoproutes.js").router
const adminroutes = require("./routes/adminroutes.js").router
const userroutes = require("./routes/userroutes.js").router
const bodyparser = require("body-parser")
const connect = require("./util/dbConnect.js")
const cors = require('cors')
const server = require('http').Server(app)
app.use((req, res, next) => {
    // Allow requests from any origin
    res.header('Access-Control-Allow-Origin', '*');

    // Allow specific headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');

    // Allow specific HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Allow credentials (if needed)
    res.header('Access-Control-Allow-Credentials', 'true');
    next()
})
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(userroutes)
app.use(shoproutes)
app.use(adminroutes)
app.use("*", (req, res) => {
    console.log("Not Found")
    return res.status(404).json({ message: "Not Found" })
})
app.use((err, req, res, next) => {
    console.error(err);
    // You can send a custom error response here
    return res.status(500).send('Something went wrong!');
});

connect().then(r => {
    app.listen(3000, () => {
        console.log("Connected And Server Running")
    })

}).catch(e => { console.log('DB Connection Failed:', e.message); })

