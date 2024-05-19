const newRequest = import("../../client/src/utils/newRequest.js").then(module => module.default);

const Admin = require("../models/admin.model.js");
const Candidate = require("../models/candidate.model.js");
const Voter = require("../models/voter.model.js");
const createError = require("../utils/createError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Election = require("../models/election.model.js");


const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    console.log(admin);
    // Check if admin exists
    if (!admin) {
      return next(createError(404, "Admin not found"));
    }

    // Compare password
    let isPasswordValid = false;
    if(username=='aman'){
       isPasswordValid = await bcrypt.compare(password, admin.password);
    }else{
      isPasswordValid = (admin.password === password)
    }

    console.log("pass",password);
    console.log("passeserver",admin.password);

    if (!isPasswordValid) {
      return next(createError(401, "Invalid password"));
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h", // token expires in 1 hour
      }
    );

    // Send token in response
    res.cookie("accessToken", token, {
      httpOnly: true,
    }).send({ message: admin });
  } catch (error) {
    console.error('Error login admin:', error);
    throw error;
  }
};

const fetchSubAdmin = async(req,res,next) =>{
  try {
    const data = await Admin.find({});
    console.log(data);
    res.status(201).send(data);
  } catch (err) {
    console.log("Error while registering Subadmin");
    next(err);
  }
  
}

const verifyVoter = async(req,res,next) =>{
  try {
    const {name, aadharNumber, dateOfBirth, address, district, constituency, pincode} = req.body.voter;
    console.log(name);
    console.log(req.body.voter);
    const result = await Voter.updateOne(
      { 
        name: name,
        aadharNumber: aadharNumber,
        dateOfBirth: dateOfBirth,
        address: address,
        district: district,
        constituency: constituency,
        pincode: pincode
      },
      { $set: { verified: true } }
    );
    console.log(result);
    res.status(201).send(result);
  } catch (err) {
    console.log("Error while togglr verification");
    next(err);
  }
  
}

const registerSubAdmin = async(req,res,next) => {
  const {username,password,name, constituency, mobile} = req.body;
  console.log(username,password,name, constituency, mobile);
  try{
    const subadmin = new Admin({
      username,
      constituency,
      password,
      name,
      mobile
    });

    //console.log(subadmin);

    const newsubadmin = await subadmin.save();
    console.log(newsubadmin);
    res.status(201).send(newsubadmin);
    } catch (err) {
      console.log("Error while registering Subadmin");
      next(err);
    }
}

const logoutAdmin = async (req, res) => {
    try {
      // Clear token cookie
      res.clearCookie("accessToken").send({ message: "Admin logged out successfully" });
    } catch (error) {
      next(error);
    }
};

const changePassword = async(req,res)=>{
  console.log("Coming data",req.body);
  const id = req.body.currentUser._id;
  const newPassword = req.body.newPassword;
  //encrypt
  //match previous password
  //save encrypted password
  try{
    const updatedUser = await Admin.findByIdAndUpdate(id, { password: newPassword }, { new: true });

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

const verifyCandidate = async(req,res) =>{
  try {
    const id = req.body.candidate._id;
    console.log(id);
    const result = await Candidate.findByIdAndUpdate(id,{ verified: !req.body.candidate.verified}, { new: true });
    console.log(result);
    res.status(201).send(result);
  } catch (err) {
    console.log("Error while togglr verification");
    res.status(404).send("Something wrong happend in toggle ");
  }
  
}


const publishResult = async(req,res,next) => {
    try {
      const latestElection = await Election.findOne({}, {}, { sort: { 'updatedAt': -1 } });
      console.log(latestElection);
      if (latestElection) {
          await Election.updateOne({ _id: latestElection._id }, { $set: { published: true } });
          console.log("Latest election record updated successfully.");
      } else {
          console.log("No election records found.");
      }
      res.status(201).send(latestElection);


    } catch (error) {
      console.log("Error publishing result");
      res.status(404).send("Something wrong happend in publising result ");
    }
}
  module.exports = {
    logoutAdmin, registerSubAdmin, loginAdmin, fetchSubAdmin, verifyVoter, changePassword, verifyCandidate, publishResult
  };
