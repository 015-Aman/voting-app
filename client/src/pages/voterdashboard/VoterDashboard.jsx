import React, { useState, useEffect } from "react";
import "./VoterDashboard.scss"; // Import your SCSS file for styling
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import {ethers} from 'ethers';
import { contractAbi, contractAddress } from "../../../../server/constants/constant";

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

  const [loggedIn, setLoggedIn] = useState(false);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState(0);
  const [candidate, setCandidate] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);
 
  useEffect( () => {
    getCandidate();
    getRemainingTime();
    getCurrentStatus();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  async function vote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );

    const tx = await contractInstance.vote(number);
    await tx.wait();
    canVote();
  }


async function canVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVote(voteStatus);

}

function handleAccountsChanged(accounts) {
  const acc = JSON.stringify(accounts);
  
  if (accounts.length > 0 && account !== accounts[0]) {
    setAccount(accounts[0]);
    canVote();
  } else {
    setIsConnected(false);
    setAccount(null);
  }
}

async function getCandidate() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const candidateList = await contractInstance.getAllVotesOfCandiates();
    // console.log(candidateList);
    const formattedCandidates = candidateList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    });
    setCandidate(formattedCandidates);
}


  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const status = await contractInstance.getVotingStatus();
    // console.log(status);
    setVotingStatus(status);
}

async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const time = await contractInstance.getRemainingTime();
    setremainingTime(parseInt(time, 16));
}

const connectWallet = async () => {
    // Perform actions to connect the wallet (e.g., MetaMask)
    // Once connected, update the loggedIn state to true
    
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);

        //yha check krna hai ye address aur loggedin user ka address same hai ya ni
        if(address === currentUser.public_address){
          setIsConnected(true);
        }
        setLoggedIn(true);
        // setIsConnected(true);
        canVote();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.error("Metamask not detected in browser");
    }
};

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
      const response = await newRequest.get("voter/auth/candidates");
      const candidateData = response.data.candidates;
      const filteredCandidates = candidateData.filter(candidates => candidates.constituency === currentUser.constituency && candidates.verified == true);
      
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
    console.log(candidates);
    setCastVote(true);
    setShowChangePassword(false);
    // handleAccountsChanged();
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
        <div className="voter-image">
          <img src={currentUser.file} alt="Voter Image" />
        </div>
        <div className="voter-details">
          <div className="voter-info">
            <span className="info-title">Name:</span> <span>{currentUser.name}</span>
          </div>
          <div className="voter-info">
            <span className="info-title">Aadhar Number:</span> <span>{currentUser.aadharNumber}</span>
          </div>
          <div className="voter-info">
            <span className="info-title">Date of Birth:</span> <span>{new Date(currentUser.dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="voter-info">
            <span className="info-title">Address:</span> <span>{currentUser.address}</span>
          </div>
          <div className="voter-info">
            <span className="info-title">District:</span> <span>{currentUser.district}</span>
          </div>
          <div className="voter-info">
            <span className="info-title">Constituency:</span> <span>{currentUser.constituency}</span>
          </div>
          <div className="voter-info">
            <span className="info-title">Pincode:</span> <span>{currentUser.pincode}</span>
          </div>
        </div>
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


      {!remainingTime && castVote && (
        <h2>Voting is Ended</h2>
      )}
      {loggedIn && isConnected && castVote && (
        <div className="cast-vote">
          <h2>Cast Vote</h2>
          <h3>Metamask Account: {account}</h3>
          <h4>Remaining time to vote: {remainingTime/60} minutes</h4>
          {/* Display voter details here */}

          { CanVote ? (
            <p className="connected-account">You have already voted.</p>
          ) : (
          <div>
            <input type="number" placeholder="Enter Candidate Index" value={number} onChange={handleNumberChange}></input>
            <br />
            <button className="login-button" onClick={vote}>Vote</button>
          </div>
          )}


        <div className="candidates-table-container">
            <table id="myTable" className="candidates-table">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Candidate name</th>
                        <th>Candidate votes</th>
                    </tr>
                </thead>
                <tbody>
                    {candidate.map((candidate, index) => (
                    <tr key={index}>
                        <td>{candidate.index}</td>
                        <td>{candidate.name}</td>
                        <td>{candidate.voteCount}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>


          {candidates.map(candidate => (
            <div key={candidate._id} className="candidate-container">
              <div className="candidate-image">
                <img src={candidate.file} alt="Candidate Image" />
              </div>
              <div className="candidate-details">
                <h3>{candidate.name}</h3>
                <p>Party Name: {candidate.partyname}</p>
                <p>Slogan: {candidate.slogan}</p>
                {/* <button className="vote-button" onClick={() => vote(currentUser)}>Vote</button> */}
                {/* Render additional candidate details as needed */}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loggedIn && castVote && (
        <div className="login-container">
          <h1 className="welcome-message">Welcome to decentralized voting application</h1>
          <div className="login">
            <button className="login-button" onClick={connectWallet}>Login to MetaMask to vote</button>
          </div>
        </div>
      )}

      {loggedIn && !isConnected && castVote && (
        <div>
          <h2>Your account and metamask account didn't match.</h2>
          <h3>Metamask Account: {account}</h3>
          <h3>Your Account: {currentUser.public_address}</h3>
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
