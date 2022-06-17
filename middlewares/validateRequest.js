const { createError } = require("../errors/createError");

const validateRequest = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, `No available fields. ERROR: ${error.message}`));
    }
    next();
  };
};

module.exports = { validateRequest };
