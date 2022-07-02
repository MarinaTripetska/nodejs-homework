const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");

const schema = Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  verify: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, {}, true);
    },
  },
});
const User = model("user", schema);

const validationUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validationEmail = Joi.object({
  email: Joi.string().email().required(),
});

const validationSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  User,
  validationUser,
  validationSubscription,
  validationEmail,
};
