const Election = require("../models/election.model.js");


const saveDate = async (req, res, next) => {
    try{
    const {startDate, endDate} = req.body;
    const date = new Date(startDate);
    const stDate = date.toISOString().split('T')[0]; // Extract date
    const stTime = date.toTimeString().split(' ')[0]; // Extract time
    const date2 = new Date(endDate);
    const eDate = date2.toISOString().split('T')[0]; // Extract date
    const eTime = date2.toTimeString().split(' ')[0]; // Extract time
    
    // Create an instance of the Election model and save the data
    const election = new Election({
        startDate: stDate,
        startTime: stTime,
        endDate: eDate,
        endTime: eTime
    });
    
    // Save the election data into the database
    const response = await election.save();
    console.log(response);
    res.status(201).send( response);
  } catch (err) {
    console.log("Error while registering voter");
    next(err);
  }
};




module.exports = {
  saveDate
};
