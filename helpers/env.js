require("dotenv").config();
const {
  PORT = 3000,
  DB_HOST,
  SECRET_KEY,
  EMAIL_FROM,
  PASSOWORD_MAIL_FROM,
} = process.env;

module.exports = { PORT, DB_HOST, SECRET_KEY, EMAIL_FROM, PASSOWORD_MAIL_FROM };
