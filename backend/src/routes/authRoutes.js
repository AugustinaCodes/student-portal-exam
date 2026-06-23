const express = require("express");
const {
	login,
	logout,
	register
} = require("../controllers/authController");
const validate = require("../middleware/validate");
const {
	loginSchema,
	registerSchema
} = require("../schemas/authSchemas");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

module.exports = router;