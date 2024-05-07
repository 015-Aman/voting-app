const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Web3 = require('web3');


const voterauthRoute = require("./routes/voter.auth.route.js");
const adminauthRoute = require("./routes/admin.auth.route.js");
const candidateauthRoute = require("./routes/candidate.auth.route.js");
const candidateRoute = require("./routes/candidate.route.js");
const candidateverifyRoute = require("./routes/candidate.verfiy.route.js");
const voterverifyRoute = require("./routes/voter.verify.route.js");
const electionRoute = require("./routes/election.route.js");

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
// app.use(cors({ origin: *, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/voter/auth", voterauthRoute);
app.use("/api/admin/auth", adminauthRoute);
app.use("/api/candidate/auth", candidateauthRoute);
app.use("/api/candidate/verify", candidateverifyRoute);
app.use("/api/voter/verify", voterverifyRoute);
app.use("/api/candidates", candidateRoute);
app.use("/api/election/auth", electionRoute);




app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});