const express = require("express");
const router = express.Router();
const { user: userControllers } = require("../../controllers");
const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validationSubscription } = require("../../models");

// update subscription
router.patch(
  "/",
  auth,
  validateRequest(validationSubscription),
  userControllers.updateSubscription
);

// check current user
router.get("/current", auth, userControllers.currentUser);

// update user avatar
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  userControllers.updateAvatar
);

module.exports = router;
