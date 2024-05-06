const Voter = require("../models/voter.model.js");
const createError = require("../utils/createError.js");

const verifyVoter = async (req, res, next) => {
  try {
    // Fetch all voters from the database
    const voters = await Voter.find({ verified: false });
    console.log("backend all voters",voters)

    // Check if there are no voters found
    if (!voters || voters.length === 0) {
      throw createError(404, "No unverified voters found");
    }

    // Send response with the list of unverified voters
    res.status(200).json({ voters });
  } catch (err) {
    // Forward error to error handling middleware
    next(err);
  }
};



const toggleVerification = async (req, res, next) => {
    try {
      // Extract voter ID from request parameters
      const { id } = req.params;
  
      // Find the voter by ID and update the verified field
      const voter = await Voter.findByIdAndUpdate(
        id,
        { $set: { verified: !voter.verified } }, // Toggle the verified field
        { new: true } // Return the updated document
      );
  
      // Check if voter is found
      if (!voter) {
        throw createError(404, 'Voter not found');
      }
  
      // Send response with the updated voter
      res.status(200).json({ voter });
    } catch (err) {
      // Forward error to error handling middleware
      next(err);
    }
  };

  module.exports = {
    verifyVoter, toggleVerification
  };