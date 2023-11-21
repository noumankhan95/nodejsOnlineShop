const router = require("express").Router()
const shopController = require("../controller/shopcontroller")
router.get("/api/shop", shopController.getProducts)
router.get("/api/shop/getProducts/:cat", shopController.getProductsbyCat)
router.get("/api/shop/getProducts", shopController.getProducts)
exports.router = router