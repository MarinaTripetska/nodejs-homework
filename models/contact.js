const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
const Contact = model("contact", schema);

const validationSchemaCreate = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .min(6)
    .pattern(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "numbers"
    )
    .required(),
  favorite: Joi.bool(),
});

const validationSchemaUpdate = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string()
    .min(6)
    .pattern(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "numbers"
    ),
  favorite: Joi.bool(),
})
  .required()
  .min(1);

const validationSchemaPatch = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  Contact,
  validationSchemaCreate,
  validationSchemaUpdate,
  validationSchemaPatch,
};
