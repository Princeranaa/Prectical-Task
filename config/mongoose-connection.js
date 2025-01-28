const mongoose = require("mongoose");
const config = require("config");

require("dotenv").config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(function () {
    console.log("connected to databse");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;
