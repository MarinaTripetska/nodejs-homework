const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});
const User = model("user", schema);

const validationUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validationSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { User, validationUser, validationSubscription };
