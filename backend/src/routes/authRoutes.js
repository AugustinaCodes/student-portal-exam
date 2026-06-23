const express = require("express");
const {
	loginUser,
	logoutUser,
	registerNewUser
} = require("../controllers/authController");
const validate = require("../middleware/validate");
const {
	loginSchema,
	registerSchema
} = require("../schemas/authSchemas");

const router = express.Router();

router.post("/register", validate(registerSchema), registerNewUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);

module.exports = router;