const mongoose = require("mongoose");

const { Schema } = mongoose;

const electionSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type:String,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Election", electionSchema);