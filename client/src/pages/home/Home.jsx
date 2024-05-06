import React from 'react';
import "./Home.scss";
function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <h2>Welcome to Jharkhand!</h2>
        <p>Jharkhand is a state in eastern India, carved out of the southern part of Bihar on 15 November 2000. The state shares its border with Bihar to the north, Uttar Pradesh to the northwest, Chhattisgarh to the west, Odisha to the south, and West Bengal to the east. The capital city of Jharkhand is Ranchi.</p>
        <h3>Vidhan Sabha Election</h3>
        <p>The Vidhan Sabha or the Legislative Assembly is the lower house of the state legislature in the Indian states and union territories. In Jharkhand, the Vidhan Sabha election is held to elect members to the state legislative assembly.</p>
        <p>The last Vidhan Sabha election in Jharkhand was held in [Year].</p>
      </div>
      <div className="image-container">
        <img src="src\assets\jharkhand.png" alt="Map of Jharkhand" />
      </div>
    </div>
  );
}

export default Home;
