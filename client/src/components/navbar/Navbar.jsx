import React from 'react';
import "./Navbar.scss"
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <Link to = '/'><img src="./img/img.jpg" alt="" /></Link>
        <span className="logo-text">Decentralized Voting System</span>
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
