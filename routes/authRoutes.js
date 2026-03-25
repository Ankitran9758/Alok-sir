const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validations/authValidation");

router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);
router.get("/logout", auth.logout);

module.exports = router;

