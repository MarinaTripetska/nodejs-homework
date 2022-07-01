const express = require("express");
const router = express.Router();
const { auth: authControllers } = require("../../controllers");
const { auth } = require("../../middlewares/auth");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validationUser } = require("../../models");

router.post(
  "/signup",
  validateRequest(validationUser),
  authControllers.registerUser
);

router.post(
  "/login",
  validateRequest(validationUser),
  authControllers.loginUser
);

router.post("/logout", auth, authControllers.logoutUser);

module.exports = router;
