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
    },
    published: {
        type: Boolean,
        default: false
    },// Automatically add createdAt and updatedAt fields
},
{
    timestamps: true
});

module.exports = mongoose.model("Election", electionSchema);