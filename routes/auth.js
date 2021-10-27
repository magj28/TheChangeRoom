
const express = require("express");
const router = express.Router();

const authController= require('../controllers/authController');

router.post("/signUp/:userID/:pas", authController.signUp);
router.post("/login/:userID/:pas", authController.login);
router.post("/logout",authController.logout)
module.exports = router;