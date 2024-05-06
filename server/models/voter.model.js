const mongoose = require("mongoose");

const { Schema } = mongoose;

const voterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  aadharNumber: {
    type: Number,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  address: {
    type: String,
    // required: true
  },
  district: {
    type: String,
    required: true
  },
  constituency: {
    type: String,
    
  },
  pincode: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  file: {
    type: String
  },
  aadharimg:{
    type:String
  },
  verified:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Voter", voterSchema);
