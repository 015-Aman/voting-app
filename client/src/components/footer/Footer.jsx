import React from 'react';
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@votingsystem.com</p>
            <p>Address: 123 Main Street, City, Country</p>
          </div>
          <div className="footer-section">
            <h3>Feedback</h3>
            <p>We welcome your feedback. Please send us your comments and suggestions.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
