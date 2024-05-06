const Candidate = require("../models/candidate.model.js");
const createError = require("../utils/createError.js");

const verifyCandidate = async (req, res, next) => {
  try {
    // Fetch all candidates from the database
    const candidates = await Candidate.find({ verified: false });
    console.log("backend all candidates",candidates)

    // Check if there are no candidates found
    if (!candidates || candidates.length === 0) {
      throw createError(404, "No unverified candidates found");
    }

    // Send response with the list of unverified candidates
    res.status(200).json({ candidates });
  } catch (err) {
    // Forward error to error handling middleware
    next(err);
  }
};

module.exports = {
  verifyCandidate
};
