const Voter = require("../models/voter.model.js");
const createError = require("../utils/createError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Web3 = require('web3');
const Candidate = require("../models/candidate.model");


const registerVoter = async (req, res, next) => {
  try {
    // const hash = bcrypt.hashSync(req.body.password, 5);////////////
    const hash = req.body.password;
    const { name, aadharNumber, dateOfBirth, address, aadharimg, district, constituency, pincode, file } = req.body;

    console.log(req.body);
    console.log("file hai", file);
    const newVoter = new Voter({
      name,
      aadharNumber,
      dateOfBirth,
      address,
      aadharimg,
      district,
      constituency,
      pincode,
      password: hash,
      file
    });

    console.log(newVoter);

    const newv = await newVoter.save();
    console.log(newv);
    res.status(201).send("Voter has been registered successfully.");
  } catch (err) {
    console.log("Error while registering voter");
    next(err);
  }
};



const loginVoter = async (req, res, next) => {
  try {

    console.log("xxfflllllllllj",req.body);


    const { aadharNo, password } = req.body;

    // Find voter by Aadhar number
    const voter = await Voter.findOne({ aadharNumber: aadharNo });
    console.log("voter",voter);
    console.log("xxffllll",voter.password);


    // Check if voter exists
    if (!voter) {
      return next(createError(404, "Voter not found"));
    }

    // Compare hashed password
    // const isPasswordValid =  bcrypt.compareSync(password, voter.password);////
    const isPasswordValid =  password == voter.password ? true:false;


    console.log("fg",password,voter.password);

    if (!isPasswordValid) {
      return next(createError(401, "Invalid password"));
    }

    console.log("voterverifiefg",voter.verified);

    if (!voter.verified) {
      return res.send(false);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        voterId: voter._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h", // token expires in 1 hour
      }
    );

    // Send token in response
    res.cookie("accessToken", token, {
      httpOnly: true,
    }).send({ info: voter._doc });
  } catch (error) {
    console.error("Error during voter login:", error);
    next(error);
  }
};


const logoutVoter = async (req, res) => {
  try {
    // Clear token cookie
    res.clearCookie("accessToken").send({ message: "Voter logged out successfully" });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res) => {
  console.log("Coming data", req.body);
  const id = req.body.currentUser._id;
  const newPassword = req.body.newPassword;

  const hash = newPassword;
  //encrypt
  // const hash = bcrypt.hashSync(newPassword, 5);
  //match previous password
  // const orghash = bcrypt.hashSync(req.body.currentPassword, 5);
  // if (orghash === req.body.currentUser.password) {
  //   console.error('original password wrong ');
  //   res.status(400).send({ message: "Wrong Password" });
  // }
  //save encrypted password
  try {
    const updatedUser = await Voter.findByIdAndUpdate(id, { password: hash }, { new: true });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    console.log('Password updated successfully:', updatedUser);
    res.status(200).send({ message: updatedUser });
  } catch (error) {
    console.error('Error updating password:', error.message);
    throw error;
  }
}

const getCandidates = async (req, res, next) => {
  // try{
    // const accounts = await Web3.eth.getAccounts();
    // const userAddress = accounts[0];

    // // Find the voter document in MongoDB with the given public address
    // const voter = await Voter.findOne({ publicAddress: userAddress }).exec();

    // if (voter) {
      // Voter found in MongoDB, show list of candidates
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
      // res.send('List of candidates...');
    // } 
    // else {
    //   // Voter not found, indicate mismatch
    //   res.send('Error: Account not authorized.');
    // }
  // } catch (error) {
  //   console.error('Error:', error);
  //   res.status(500).send('Internal Server Error');
  // }
  
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
  registerVoter, loginVoter, logoutVoter, changePassword, getCandidates
};
