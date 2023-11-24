const mongoose = require("mongoose");

const mongo_uri = 'mongodb://0.0.0.0:27017/project';

exports.connect = () => {
  mongoose
    .connect(mongo_uri)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((error) => {
      console.error("Database connection failed: " + error);
    });
};
