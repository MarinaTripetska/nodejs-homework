const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
  updateAvatar,
} = require("../../controllers");
const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validationUser, validationSubscription } = require("../../models");

router.post("/signup", validateRequest(validationUser), registerUser);
router.post("/login", validateRequest(validationUser), loginUser);

router.post("/logout", auth, logoutUser);

router.get("/current", auth, currentUser);

router.patch(
  "/",
  auth,
  validateRequest(validationSubscription),
  updateSubscription
);

router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
