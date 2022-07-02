const {
  Contact,
  validationSchemaCreate,
  validationSchemaUpdate,
  validationSchemaPatch,
} = require("./contact");

const {
  User,
  validationUser,
  validationSubscription,
  validationEmail,
} = require("./user");

module.exports = {
  Contact,
  User,
  validationUser,
  validationEmail,
  validationSubscription,
  validationSchemaCreate,
  validationSchemaUpdate,
  validationSchemaPatch,
};
