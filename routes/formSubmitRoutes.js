const express = require("express");
const router = express.Router();
const { FormSubmit } = require("../controllers/formSubmitController");
const { AuthenticateToken } = require("../middleware/authenticateToken");



router.post("/coachform", AuthenticateToken, FormSubmit);

module.exports = router;