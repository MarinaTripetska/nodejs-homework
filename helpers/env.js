require("dotenv").config();
const { PORT = 3000, DB_HOST, SECRET_KEY } = process.env;

module.exports = { PORT, DB_HOST, SECRET_KEY };
