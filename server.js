const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB is working");
  })
  .then(() => {
    app.listen(PORT);
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch((error) => {
    console.log(`ERROR: ${error.message}`);
  });
