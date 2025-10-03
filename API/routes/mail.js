const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");
const isAuthenticated = require("../middleware/auth");

router.post("/", mailController.sendMail);

module.exports = router;
