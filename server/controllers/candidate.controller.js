const Candidate = require("../models/candidate.model");
const createError = require("../utils/createError");

// Controller function to fetch candidates
const getCandidates = async (req, res, next) => {
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
};

module.exports = {
  getCandidates,
};
