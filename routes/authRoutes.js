// routes/auth.js
const express = require("express");
const { SignUp } = require("../controllers/signupController");
const { Login } = require("../controllers/loginController");
const router = express.Router();

router.post("/register", SignUp);
router.post("/login", Login);

module.exports = router;
