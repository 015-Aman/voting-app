const Candidate = require("../models/candidate.model");
const createError = require("../utils/createError");
const express = require('express');
const mongoose = require('mongoose');
const Web3 = require('web3');
const Voter = require("../models/voter.model.js");

// Initialize Express app
const app = express();

// Initialize Web3 with local blockchain
// const web3 = new Web3('http://localhost:7545');

// Controller function to fetch candidates
const getCandidates = async (req, res, next) => {
  try {
    // const accounts = await web3.eth.getAccounts();
    // const userAddress = accounts[0];

    // // Find the voter document in MongoDB with the given public address
    // const voter = await Voter.findOne({ publicAddress: userAddress }).exec();

    // if (voter) {
      // Voter found in MongoDB, proceed to fetch candidates
      try {
        // Fetch all candidates from the database
        const candidates = await Candidate.find();
        // Check if there are no candidates found
        if (!candidates || candidates.length === 0) {
          throw createError(404, "No candidates found");
        }
        // Send response with the list of candidates
        res.status(200).json({ candidates });
      } catch (error) {
        // Forward error to error handling middleware
        next(error);
      }
    // } 
    // else {
    //   // Voter not found, indicate mismatch
    //   res.send('Error: Account not authorized.');
    // }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getCandidates,
};
