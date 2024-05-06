import React, { useState } from "react";
import "./CandidateDashboard.scss"; // Import your SCSS file for styling

function CandidateDashboard() {
  const [viewCandidateDetails, setViewCandidateDetails] = useState(false);
  const [viewVotingDetails, setViewVotingDetails] = useState(false);

  const handleViewCandidateDetails = () => {
    setViewCandidateDetails(true);
    setViewVotingDetails(false);
  };

  const handleViewVotingDetails = () => {
    setViewVotingDetails(true);
    setViewCandidateDetails(false);
  };

  return (
    <div className="candidate-dashboard">
      <h1>Candidate Dashboard</h1>

      <div className="navbar">
        <button onClick={handleViewCandidateDetails}>View Candidate Details</button>
        <button onClick={handleViewVotingDetails}>View Voting Details</button>
      </div>

      {viewCandidateDetails && (
        <div className="candidate-details">
          {/* Render Candidate Details component */}
          {/* You can create a separate component for candidate details */}
          <h2>Candidate Details</h2>
          {/* Display candidate details here */}
        </div>
      )}

      {viewVotingDetails && (
        <div className="voting-details">
          {/* Render Voting Details component */}
          {/* You can create a separate component for voting details */}
          <h2>Voting Details</h2>
          {/* Display voting details here */}
        </div>
      )}
    </div>
  );
}

export default CandidateDashboard;
