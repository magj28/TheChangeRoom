const express = require("express");
const router = express.Router();

const orderController= require('../controllers/orderController');

router.get("/getOrders/:userID", orderController.getOrders);
router.post("/postOrder/:userID", orderController.postOrder);

module.exports = router;