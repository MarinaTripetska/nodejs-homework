const { v4 } = require("uuid");

const generateVarifycationToken = () => {
  return v4();
};

module.exports = { generateVarifycationToken };
