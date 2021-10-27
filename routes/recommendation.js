const express = require("express");
const router = express.Router();

const recController= require('../controllers/recommendationController');

router.get("/getRecommendedItem/:userID", recController.getRecommendedItems);
router.post("/postRecommendedItem/:userID", recController.postRecommendedItem);
//body : itemID, toRecommendedUserID

module.exports = router;