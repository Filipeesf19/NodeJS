const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: "Users",
  });
};

module.exports = connectDB;
