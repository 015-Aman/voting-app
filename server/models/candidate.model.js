const mongoose = require("mongoose");

const { Schema } = mongoose;

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  
  district: {
    type: String,
    required: true
  },
  constituency: {
    type: String,
    required: true
  
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
  partyname:{
    type:String

  },
  slogan:{
    type:String

  },
  verified:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Candidate", candidateSchema);