const express = require("express");
const router = express.Router();

const cartController= require('../controllers/cartController');

router.get("/getCart/:userID", cartController.getCart);
router.post("/postItem/:userID", cartController.postItemToCart);
//body : itemID, recStatus, points, recBy

module.exports = router;