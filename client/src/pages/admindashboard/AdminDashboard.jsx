import React, { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import newRequest from "../../utils/newRequest";
import "./AdminDashboard.scss";
import { useNavigate } from "react-router-dom";
import Chart from "react-google-charts";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [candidateData, setCandidateData] = useState([]);
  const [voterData, setVoterData] = useState([]);
  const [subAdminData, setSubAdminData] = useState([]);
  const [showSubAdminForm, setShowSubAdminForm] = useState(false);
  const [showSubAdmin, setShowSubAdmin] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [subadminList, setSubAdminList] = useState([]);

  const [electionResults, setElectionResults] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showResult, setShowResult] = useState(false);
  const [startElection, setStartElection] = useState(false);
  const [candidate, setCandidate] = useState(false);
  const [voter, setVoter] = useState(false);

  const [subAdminFormData, setSubAdminFormData] = useState({
  
    name:"",
    mobile:"",
    username: "",
    constituency: "",
    password: "",
    // Add more fields as needed
  });

  const toggleVerification = async (candidate) => {
    try {
  
      // Send a request to update the candidate's verified status
      console.log("Info ",candidate)

      const response = await newRequest.post("admin/auth/verifycandidate", {candidate});
  
      console.log(response);
  
      // Update the candidateData state to reflect the changes
      setCandidateData(prevCandidates => prevCandidates.map(prevCandidate => {
        if (prevCandidate._id === candidate._id) {
          return { ...prevCandidate, verified: true };
        }
        return prevCandidate;
      }));
    } catch (error) {
      console.error("Error toggling verification:", error);
    }
  };
  

// const [password, setPassword] = useState("");
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const handleChangePassword = async () => {
  try {

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one symbol, one digit, and be at least 8 characters long. Please re-enter.");
      return;
    }

    // if(currentPassword !== currentUser.password){
    //   console.error("Current password is wrong.");
    //   alert("Current password is wrong.");
    //   return;
    // }
    if (newPassword !== confirmPassword) {
      // If new password and confirm password don't match, show an error message
      console.error("New password and confirm password do not match.");
      alert("New password and confirm password do not match.");
      return;
    }
    console.log("current user details",currentUser);
    const response = await newRequest.post("admin/auth/changepassword", {currentUser,newPassword});
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
      // Do something with the data
      console.log(typeof (parsedData));
      setCurrentUser(parsedData);
      console.log(currentUser);
    }
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStartElection = async () => {
    setShowChangePassword(false);
    setCandidateData([]);
    setVoterData([]);
    setShowSubAdminForm(false);
    setShowSubAdmin(null);
    setShowSubAdminForm(false);
    setSubAdminList([]);
    setStartElection(true);
    setShowResult(false);
    try {
      // Validate if the election date and time are selected
      console.log(startDate+" ==== > "+endDate);
      const respose = await newRequest.post("/election/auth/save", {startDate,endDate});
      console.log(respose);
      alert("Election date and time set successfully");
      // Clear the input fields after starting the election
    } catch (error) {
      console.error("Error starting the election:", error);
    }
  };

  // Function to handle date and time change

  const handleSubAdminList = async () => {
    setShowChangePassword(false);
    setCandidateData([]);
    setVoterData([]);
    setShowSubAdminForm(false);
    setShowSubAdmin(null);
    setShowSubAdminForm(false);
    setSubAdminList([]);
    setShowResult(false);
    setCandidate(false);
    setVoter(false);
    try {
      const response = await newRequest.get("/admin/auth/subadmin");
      console.log(response.data);
      const filteredCandidates = response.data.filter(candidate => (candidate.username !== 'aman'));

      setSubAdminList(filteredCandidates);
    } catch (error) {
      console.error("Error fetching subadmins:", error);
    }
  };
  
  const handleVerifyCandidates = async () => {
    try {
      setVoterData([]);
      setShowSubAdminForm(false);
      setShowChangePassword(false);
      setCandidate(true);
      setVoter(false);
      setShowResult(false);
      const response = await newRequest.get("/candidate/verify");
      // console.log(response.data.candidates);
      // console.log(currentUser.constituency);
      const candidates = response.data.candidates;
      const filteredCandidates = candidates.filter(candidate => (candidate.constituency === currentUser.constituency));
      setCandidateData(filteredCandidates);
      // console.log(candidateData);
    } catch (error) {
      console.error("Error fetching candidate data:", error);
    }
  };

  const handleVerifyVoters = async () => {
    try {
      setCandidateData([])
      setShowSubAdminForm(false);
      setShowChangePassword(false);
      setVoter(true);
      setCandidate(false);
      setShowResult(false);
      const response = await newRequest.get("/voter/verify");
      const voters = response.data.voters;
      const filteredVoters = voters.filter(voter => voter.constituency === currentUser.constituency);
      setVoterData(filteredVoters);
      console.log(currentUser);
    } catch (error) {
      console.error("Error fetching voter data:", error);
    }
  };

  const fetchElectionResults = async () => {
    // Example implementation: fetch data from an API endpoint
    const response = await newRequest.get("/election/results");
    return response.data;
  };  

  const handleDeclareResult = async () => {
    // Implement your logic for declaring results here
    setShowResult(true);
    setStartElection(false);
    setShowChangePassword(false);
    setCandidateData([]);
    setVoterData([]);
    setShowSubAdminForm(false);
    setShowSubAdmin(null);
    setShowSubAdminForm(false);
    setSubAdminList([]);
    setCandidate(false);
    setVoter(false);
   
    try {
      // Retrieve data on total voters, votes per candidate, etc.
      // This data should be structured as an array of objects
      const results = await fetchElectionResults(); // Implement this function to fetch data from your API or database
      setElectionResults(null);
    } catch (error) {
      console.error("Error declaring results:", error);
    }
  };

  

  // useEffect(() => {
  //   handleDeclareResult();
  // }, []);

  const handleLogout =async()=> {
    const response = await newRequest.post("admin/auth/logout");
    console.log("Logout Successfully",response);
    navigate("/adminlogin");
  }



  const handleSubAdmin = () => {
    setShowSubAdmin(null);
    setShowSubAdminForm(true);
    setCandidateData([]);
    setVoterData([]);
    setSubAdminList([]);
    setShowResult(false);
    setStartElection(false);
    setShowChangePassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setSubAdminFormData({ ...subAdminFormData, [name]: value });
  };

  const handleSubmitSubAdminForm = async (e) => {
    e.preventDefault();
    
    try {
      const { username, constituency, password } = subAdminFormData; // Destructure username and constituency from subAdminFormData
      console.log(subAdminFormData);
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(password)) {
        alert("Password must contain at least one uppercase letter, one lowercase letter, one symbol, one digit, and be at least 8 characters long. Please re-enter.");
        return;
      }
      const response = await newRequest.post("admin/auth/registersubadmin", subAdminFormData);
      console.log("Sub Admin Created:", response);
      
      
      setShowSubAdminForm(false);
      setShowSubAdmin(username); // Use username from subAdminFormData
      console.log(username); // Log the username
  
      setSubAdminFormData({
        username: "", // Reset username
        constituency: "", // Reset constituency
        password: ""
        // Reset more fields if needed
      });
    } catch (error) {
      console.error("Error creating sub-admin:", error);
    }
  };
  

  const handleChangePwd = () =>{
    setShowChangePassword(true);
    setCandidateData([]);
    setVoterData([]);
    setShowSubAdminForm(false);
    setShowSubAdmin(null);
    setShowSubAdminForm(false);
    setSubAdminList([]);
    setShowResult(false);
    setCandidate(false);
    setVoter(false);
  }

  const formatChartData = (electionResults) => {
    // Example format: [["Constituency", "Votes"], ["Constituency 1", 100], ["Constituency 2", 200], ...]
    // const chartData = electionResults.map((result) => [
    //   result.constituency,
    //   result.votes,
    // ]);
    const chartData = [["Candidate A", 20], ["Candidate B", 10], ["Candidate C", 13], ["Candidate D", 15]]
    // Add header row
    chartData.unshift(["Candidates", "Votes"]);
    return chartData;
  };

  return (
    
    <div className="admin-dashboard">
  <h1>Admin Dashboard</h1>

  <div className="navbar">
  {currentUser.username !== 'aman' ? (
    <>
      <button onClick={handleVerifyCandidates}>Verify Candidates</button>
      <button onClick={handleVerifyVoters}>Verify Voters</button>
      <button onClick={handleChangePwd}>Change Password</button>
      <button onClick={handleDeclareResult}>Results</button>
      <button onClick={handleLogout}>Logout SubAdmin</button>
    </>
  ) : (
    <>
      
      <button onClick={handleStartElection}>Start Election</button>
      <button onClick={handleDeclareResult}>Declare Result</button>
      <button onClick={handleSubAdmin}>Add a Sub Admin</button>
      <button onClick={handleSubAdminList}>Show SubAdmin List</button>
      <button onClick={handleChangePwd}>Change Password</button>
      <button onClick={handleLogout}>Logout Admin</button>
    </>
  )}
</div>

      { showResult && (<div className="pie-chart-container">
        <h2>Election Results</h2>
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart...</div>}
          data={formatChartData(electionResults)}
          options={{
            title: "Election Results",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>)}

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
  {showSubAdminForm && (
        <div className="sub-admin-form">
          <h2>Add Sub Admin</h2>
          <form onSubmit={handleSubmitSubAdminForm}>
            <label>Name :</label>
            <input type="text" name="name" value={subAdminFormData.name} onChange={handleChange} required />
            <label>Mobile Number :</label>
            <input type="text" name="mobile" value={subAdminFormData.mobile} onChange={handleChange} required />
            <label>UserName :</label>
            <input type="text" name="username" value={subAdminFormData.username} onChange={handleChange} required />
            <label>Constituency :</label>
            <select
              id="constituency"
              name="constituency"
              value={subAdminFormData.constituency}
              onChange={handleChange}
              required
              >
              <option value="" enabled>
                Select Constituency
              </option>
              {[
                "Bermo", "Bokaro", "Chandankiyari", "Dhanbad", "Giridih", "Jamua", "Jharia", "Nirsa", "Baghmara", "Baharagora",
                "Chaibasa", "Ghatsila", "Jaganathpur", "Jhinkpani", "Manoharpur", "Potka", "Seraikella", "Sukrui", "Chakradharpur",
                "Jaganathpur", "Kharsawan", "Tamar", "Torpa", "Bandgaon", "Barhait", "Borio", "Litipara", "Maheshpur", "Pakur",
                "Rajmahal", "Bishrampur", "Chhatarpur", "Daltonganj", "Garhwa", "Hussainabad", "Manika", "Panki", "Barkatha",
                "Bishunpur", "Dumka", "Gopikandar", "Jama", "Jamtara", "Nala", "Sarath", "Bahragora", "Ghatshila", "Jugsalai",
                "Jamshedpur East", "Jamshedpur West", "Jharkhand", "Baharagora", "Barhait", "Boiro", "Dumka", "Jama", "Jamtara",
                "Nala", "Sarath", "Bahragora", "Ghatshila", "Jugsalai", "Jamshedpur East", "Jamshedpur West", "Jharkhand",
                "Kharasawan", "Potka", "Seraikella", "Sukrui", "Chaibasa", "Chakradharpur", "Ghatsila", "Jaganathpur", "Jhinkpani",
                "Manoharpur", "Maheshpur", "Torpa", "Bandgaon", "Kharsawan", "Tamar", "Bishrampur", "Chhatarpur", "Daltonganj",
                "Garhwa", "Hussainabad", "Manika", "Panki", "Barkatha", "Bishunpur", "Litipara", "Pakur", "Rajmahal"
              ].map((constituency, index) => (
                <option key={index} value={constituency}>
                  {constituency}
                </option>
              ))}
            </select>
            <label>Password:</label>
            <input type="password" name="password" value={subAdminFormData.password} onChange={handleChange} required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {
          showSubAdmin && (
            <h2>SubAdmin : {showSubAdmin} created Successfully</h2>
          )
      }


      {}
{subadminList.length !== 0 &&(
  <div className="sub-admin-list">
    <h2>SubAdmin Information</h2>
    {subadminList.map((sadmin, index) => (
      <div key={index} className="sub-admin-info">
        <div className="info-container">
          <p>Username: {sadmin.username}</p>
          {sadmin.constituency && <p>Constituency: {sadmin.constituency}</p>}
          {sadmin.name && <p>Name: {sadmin.name}</p>}
          {sadmin.mobile && <p>Mobile: {sadmin.mobile}</p>}
        </div>
      </div>
    ))}
  </div>
)}


      {subAdminData.length > 0 && (
        <div className="sub-admin-list">
          <h2>Sub Admin List</h2>
          <ul>
            {subAdminData.map((subadmin, index) => (
              <li key={index}>
                <div>
                  <p>Constituency: {subadmin.constituency}</p>
                  <p>Name: {subadmin.name}</p>
                  <p>Mobile Number: {subadmin.mobile}</p>
                  <p>Username: {subadmin.username}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {candidateData.length > 0 ? (
        <div className="candidate-list">
          <h2>Candidate List</h2>
          <ul>
            {candidateData.map((candidate, index) => (
              <li key={index}>
                <div>
                  <div>
                    <h2>Candidate Information</h2>
                    <p>Name: {candidate.name}</p>
                    <p>Party Name: {candidate.partyname}</p>
                    <p>Slogan: {candidate.slogan}</p>
                    <p>Aadhar Number: {candidate.aadharNumber}</p>
                    <p>Date of Birth: {new Date(candidate.dateOfBirth).toLocaleDateString()}</p>
                    <p>Address: {candidate.address}</p>
                    <p>District: {candidate.district}</p>
                    <p>Constituency: {candidate.constituency}</p>
                    <p>Pincode: {candidate.pincode}</p>
                    {/* Assuming verified is a property in candidate data */}
                    <p>Verified: {candidate.verified ? 'True' : 'False'}</p>
                    {/* Assuming you have a function to toggle verification status */}
                    {candidate.verified === false && (<button onClick={() => toggleVerification(candidate)}>Unverified</button>)}
                    <br />
                    <img src={candidate.file} alt="Candidate ID" height={150} width={200}/>
                    {/* <img src={candidate.aadharimg} alt="Candidate ID" /> */}
                    <img
      src={candidate.aadharimg}
      alt="Aadhar Card"
      style={{ maxWidth: "600px", height: "auto", marginTop: "10px" }}
    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ): (candidate && (
        <div>
          <h1>No candidates to verify.</h1>
        </div>
      ))}

{voterData.length > 0 ? (
        <div className="voter-list">
          <h2>Voter List</h2>
          <ul>
            {voterData.map((voter, index) => (
              <li key={index}>
                <div>
                  <div>
                    <h2>Candidate Information</h2>
                    <p>Name: {voter.name}</p>
                    <p>Aadhar Number: {voter.aadharNumber}</p>
                    <p>Date of Birth: {new Date(voter.dateOfBirth).toLocaleDateString()}</p>
                    <p>Address: {voter.address}</p>
                    <p>District: {voter.district}</p>
                    <p>Constituency: {voter.constituency}</p>
                    <p>Pincode: {voter.pincode}</p>
                    {/* Assuming verified is a property in candidate data */}
                    <p>Verified: {voter.verified ? 'True' : 'False'}</p>
                    {/* Assuming you have a function to toggle verification status */}
                    <button onClick={() => toggleVerification(voter)}>Toggle Verification</button>
                    <br />
                    <img  src={voter.file} alt="Candidate ID" height={150} width={200} />
                    {/* <img  src={voter.aadharimg} alt="Candidate ID" /> */}
                    <img
                        src={voter.aadharimg}
                        alt="Candidate ID"
                        style={{ maxWidth: "600px", height: "auto", marginTop: "10px" }}
                      />

                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ):(voter &&(
        <div>
          <h1>No Voters to verify</h1>
        </div>
      ))}

      {startElection && (<div className="start-election-section">
        <h2>Set Election start date and time</h2>
        <div className="election-inputs">
          <label>Select Date and Time:</label>
          <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()} // Disable past dates
        />
        </div>

        <h2>Set Election end date and time</h2>
        <div className="election-inputs">
          <label>Select Date and Time:</label>
          <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()} // Disable past dates
        />
        </div>

        <button onClick={handleStartElection}>Set Date and Time</button>
      </div>)}

    </div>
  );
}

export default AdminDashboard;
