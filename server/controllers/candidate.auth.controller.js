const Candidate = require("../models/candidate.model.js");
const createError = require("../utils/createError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerCandidate = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const { name, aadharNumber, dateOfBirth, address, partyname, slogan, aadharimg,district, constituency, pincode, file } = req.body;
    
    const newCandidate = new Candidate({
      name,
      aadharNumber,
      dateOfBirth,
      address,
      partyname,
      slogan,
      district,
      constituency,
      pincode,
      password: hash,
      aadharimg,
      file
    });

    const newCandidateData = await newCandidate.save();
    res.status(201).send("Candidate has been registered successfully.");
  } catch (err) {
    next(err);
  }
};

const loginCandidate = async (req, res, next) => {
  try {
    const { aadharNumber, password } = req.body;

    // Find candidate by Aadhar number
    const candidate = await Candidate.findOne({ aadharNumber });

    // Check if candidate exists
    if (!candidate) {
      return next(createError(404, "Candidate not found"));
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, candidate.password);

    if (!isPasswordValid) {
      return next(createError(401, "Invalid password"));
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        candidateId: candidate._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h", // token expires in 1 hour
      }
    );

    // Send token and candidate data in response
    res.cookie("accessToken", token, {
      httpOnly: true,
    }).send({info: candidate._doc });
  } catch (error) {
    next(error);
  }
};

const logoutCandidate = async (req, res) => {
  try {
    // Clear token cookie
    res.clearCookie("accessToken").send({ message: "Candidate logged out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCandidate, loginCandidate, logoutCandidate
};
