const Voter = require("../models/voter.model.js");
const createError = require("../utils/createError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerVoter = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
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
    const { aadharNo, password } = req.body;

    // Find voter by Aadhar number
    const voter = await Voter.findOne({ aadharNumber: aadharNo });

    // Check if voter exists
    if (!voter) {
      return next(createError(404, "Voter not found"));
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, voter.password);

    if (!isPasswordValid) {
      return next(createError(401, "Invalid password"));
    }

    if (!voter.verified) {
      return res.send({ verified: false });
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
  //encrypt
  const hash = bcrypt.hashSync(newPassword, 5);
  //match previous password
  const orghash = bcrypt.hashSync(req.body.currentPassword, 5);
  if (orghash === req.body.currentUser.password) {
    console.error('original password wrong ');
    res.status(400).send({ message: "Wrong Password" });
  }
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


module.exports = {
  registerVoter, loginVoter, logoutVoter, changePassword
};
