import React, { useState } from "react";
import "./AdminLogin.scss"; // Make sure to create AdminLogin.scss file for styling
import newRequest from "../../utils/newRequest"; // Assuming you have a utility for API requests
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Username:", username);
      console.log("Password:", password);
      // Assuming you have an API endpoint for admin login
      const res = await newRequest.post("admin/auth/login", { username, password });
      // console.log(res.data);
      if (res.status === "OK") {
        alert("You are Not verified yet");
        setAadharNumber("");
        setPassword("");
        return;
      }
      //console.log("Response:", res.data.message);
      localStorage.setItem("currentUser", JSON.stringify(res.data.message));
      navigate("/admindash");

    } catch (err) {
      setError(err.response);
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;
