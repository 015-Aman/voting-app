// import React, { useState } from "react";
// import "./CandidateLogin.scss";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";

// function CandidateLogin() {
//   const [aadharNumber, setAadharNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await newRequest.post("candidate/auth/login", { aadharNumber, password });
//       console.log("candidate respo",res.data.info.verified);
      
//       if (res.data.info.verified === false) {
//         alert("Invalid credentials. Please try again.");
//         setAadharNumber("");
//         setPassword("");
//         return;
//       }

//       localStorage.setItem("currentUser", JSON.stringify(res.data));
//       navigate("/");
//     } catch (err) {
//       setError(err.response.data);
//     }
//   };

//   return (
//     <div className="candidate-login">
//       <form onSubmit={handleSubmit}>
//         <h1>Candidate's Login</h1>
//         <label htmlFor="aadharNumber">Aadhar Number</label>
//         <input
//           name="aadharNumber"
//           type="text"
//           placeholder="1234-5678-9012"
//           onChange={(e) => setAadharNumber(e.target.value)}
//           required
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           name="password"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         {error && <div className="error">{error}</div>}
//       </form>
//     </div>
//   );
// }

// export default CandidateLogin;

import React, { useState } from "react";
import "./CandidateLogin.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function CandidateLogin() {
  const [aadharNumber, setAadharNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("candidate/auth/login", { aadharNumber, password });
      console.log("candidate response:", res);

      if (res.data.info.verified === false) {
        alert("You are Not verified yet");
        setAadharNumber("");
        setPassword("");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/candidatedash");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="candidate-login">
      <form onSubmit={handleSubmit}>
        <h1>Candidate's Login</h1>
        <label htmlFor="aadharNumber">Aadhar Number</label>
        <input
          name="aadharNumber"
          type="text"
          placeholder="1234-5678-9012"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default CandidateLogin;
