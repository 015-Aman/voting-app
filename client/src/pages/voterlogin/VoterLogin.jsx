// import React, { useState } from "react";
// import "./VoterLogin.scss";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";

// function VoterLogin() {
//   const [aadharNo, setAadharNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("aadha",aadharNo);
//       console.log("passwore",password);
//       const res = await newRequest.post("voter/auth/login", { aadharNo, password });

//       console.log("front res",res);
      
//       if(res.data == false)
//       {
//         alert("You are Not verified yet");
//         return;
//       }

//       localStorage.setItem("currentUser", JSON.stringify(res.data));

//       navigate("/");
//     } catch (err) {
//       setError(err.response.data);
//     }
//   };

//   return (
//     <div className="voter-login">
//       <form onSubmit={handleSubmit}>
//         <h1>Voter's Login</h1>
//         <label htmlFor="aadharNo">Aadhar Number</label>
//         <input
//           name="aadharNo"
//           type="text"
//           placeholder="1234-5678-9012"
//           onChange={(e) => setAadharNo(e.target.value)}
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

// export default VoterLogin;


import React, { useState } from "react";
import "./VoterLogin.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; // Import bcryptjs

function VoterLogin() {
  const [aadharNo, setAadharNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("aadha",aadharNo);
      console.log("passwore",password);

      // Fetch user data from the server
      const res = await newRequest.post("voter/auth/login", { aadharNo });

      console.log("front res",res);
      
      if(res.data == false)
      {
        alert("You are Not verified yet");
        // Clear input fields
        setAadharNo("");
        setPassword("");
        return;
      }

      // if(!res.data.hashedPassword) {
      //   // User not found or password not set
      //   alert("Invalid Aadhar Number or password.");
      //   // Clear input fields
      //   setAadharNo("");
      //   setPassword("");
      //   return;
      // }

      // Compare hashed password
      const isPasswordCorrect = await bcrypt.compare(password, res.data.hashedPassword);
      if (!isPasswordCorrect) {
        // Incorrect password
        alert("Invalid Aadhar Number or password.");
        // Clear input fields
        setAadharNo("");
        setPassword("");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(res.data));

      navigate("/voterdash");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="voter-login">
      <form onSubmit={handleSubmit}>
        <h1>Voter's Login</h1>
        <label htmlFor="aadharNo">Aadhar Number</label>
        <input
          name="aadharNo"
          type="text"
          placeholder="1234-5678-9012"
          value={aadharNo}
          onChange={(e) => setAadharNo(e.target.value)}
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

export default VoterLogin;
