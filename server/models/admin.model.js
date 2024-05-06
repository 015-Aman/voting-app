const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  constituency: {
    type: String,
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Admin", adminSchema);