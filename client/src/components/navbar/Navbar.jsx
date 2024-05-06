import React from 'react';
import "./Navbar.scss"
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./img/logo.png" alt="" />
        Voting System
      </div>
      <div className="navbar-links">
        <Link to='/'>Home</Link>
        <Link to='/adminlogin'>Admin Login</Link>
        <Link to='/voterlogin'>Voter Login</Link>
        <Link to='/voterreg'>Voter Registration</Link>
        <Link to='/candidatereg'>Candidate Registration</Link>
      </div>
    </nav>
  );
}

export default Navbar;
