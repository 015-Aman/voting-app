import React, { useState, useEffect } from "react";
import "./VoterDashboard.scss"; // Import your SCSS file for styling
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function VoterDashboard() {
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [viewVotingHistory, setViewVotingHistory] = useState(false);
  const [viewVoterDetails, setViewVoterDetails] = useState(false);
  const [viewCandidateDetails, setViewCandidateDetails] = useState(false);
  const [castVote, setCastVote] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [candidates, setCandidates] = useState([]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      
      if (newPassword !== confirmPassword) {
        // If new password and confirm password don't match, show an error message
        alert("New password and confirm password do not match")
        console.error("New password and confirm password do not match.");
        return;
      }
      
      console.log("current user details",currentUser);
      const response = await newRequest.post("voter/auth/changepassword", {currentUser,newPassword, currentPassword});
      console.log("Password changed successfully:", response);

      // Reset the input fields after successful password change
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("currentUser");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Data from localStorage:", parsedData);
      setCurrentUser(parsedData.info);
    }
  
    // Fetch candidate data
    fetchCandidates();
  }, []);
  
  const fetchCandidates = async () => {
    try {
      const response = await newRequest.get("/candidates");
      const candidateData = response.data.candidates;
      const filteredCandidates = candidateData.filter(candidates => candidates.constituency === currentUser.constituency);
      
      console.log("Candidate data:", filteredCandidates);
      setCandidates(filteredCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };
  
  

  const handleViewVoterDetails = () => {
    setViewVotingHistory(false);
    setViewVoterDetails(true);
    setViewCandidateDetails(false);
    setCastVote(false);
    setShowChangePassword(false);
  };
  
  const handleViewCandidateDetails = () => {
    setViewVotingHistory(false);
    setViewVoterDetails(false);
    setViewCandidateDetails(true);
    setCastVote(false);
    setShowChangePassword(false);
  };
  
  const handleViewVotingHistory = () => {
    setViewVotingHistory(true);
    setViewVoterDetails(false);
    setViewCandidateDetails(false);
    setCastVote(false);
    setShowChangePassword(false);
  };

  const handleCastVote = () => {
    setViewVotingHistory(false);
    setViewVoterDetails(false);
    setViewCandidateDetails(false);
    setCastVote(true);
    setShowChangePassword(false);
  };

  const handleChangePwd = () =>{
    setShowChangePassword(true);
    setViewVotingHistory(false);
    setViewVoterDetails(false);
    setViewCandidateDetails(false);
    setCastVote(false);
  }

  const handleLogout =async()=> {
    const response = await newRequest.post("voter/auth/logout");
    console.log("Logout Successfully",response);
    navigate("/voterlogin");
  }

  return (
    <div className="voter-dashboard">
      <h1>Voter Dashboard</h1>

      <div className="navbar">
        <button onClick={handleViewVoterDetails}>View Voter Details</button>
        <button onClick={handleViewCandidateDetails}>View Candidate Details</button>
        <button onClick={handleCastVote}>Cast Vote</button>
        <button onClick={handleChangePwd}>Change Password</button>
        <button onClick={handleViewVotingHistory}>View Voting History</button>
        <button onClick={handleLogout}>Logout</button>
      </div>


      { showChangePassword && (
        <div className="change-password-form">
        {/* <h2>Change Password</h2> */}
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button onClick={()=>handleChangePassword()}>Change Password</button>
        </div>
        </div>)
      }

      {viewVoterDetails && (
        <div className="voter-list">
          <div><img src={currentUser.file} alt="Voter Image" height={100} width={100} /></div>
          <div className="voter-info">Name: {currentUser.name}</div>
          <div className="voter-info">Aadhar Number: {currentUser.aadharNumber}</div>
          <div className="voter-info">Date of Birth: {new Date(currentUser.dateOfBirth).toLocaleDateString()}</div>
          <div className="voter-info">Address: {currentUser.address}</div>
          <div className="voter-info">District: {currentUser.district}</div>
          <div className="voter-info">Constituency: {currentUser.constituency}</div>
          <div className="voter-info">Pincode: {currentUser.pincode}</div>

        </div>
      )}

      {viewCandidateDetails && (
        <div className="candidate-details">
          <h2>Candidate Details</h2>
          {/* Iterate over the list of candidates */}
          {candidates.map(candidate => (
            <div key={candidate._id} className="candidate-container">
              <div className="candidate-image">
                <img src={candidate.file} alt="Candidate Image" height={100} width={100} />
              </div>
              <div className="candidate-details">
                <h3>{candidate.name}</h3>
                <p>Party Name: {candidate.partyname}</p>
                <p>Slogan: {candidate.slogan}</p>
              </div>
              {/* Render additional candidate details as needed */}
            </div>
          ))}
        </div>
      )}

      {castVote && (
        <div className="cast-vote">
          <h2>Cast Vote</h2>
          {/* Display voter details here */}
          {candidates.map(candidate => (
            <div key={candidate._id} className="candidate-container">
              <div className="candidate-image">
                <img src={candidate.file} alt="Candidate Image" />
              </div>
              <div className="candidate-details">
                <h3>{candidate.name}</h3>
                <p>Party Name: {candidate.partyname}</p>
                <p>Slogan: {candidate.slogan}</p>
                <button className="vote-button" onClick={() => vote(currentUser)}>Vote</button>
                {/* Render additional candidate details as needed */}
              </div>
            </div>
          ))}

        </div>
      )}

      {viewVotingHistory && (
        <div className="voting-history">
          <h2>Voting History</h2>
          {/* Display voting history here */}
        </div>
      )}
    </div>
  );
}

export default VoterDashboard;
