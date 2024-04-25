// AnotherClientPortfolio.jsx
import React from 'react';

const AnotherClientProfile = ({}) => {

  return (
      <div className="Client-portfolio-overlay">
      <div className="Client-portfolio-container">
        <div className="Header">
          <div className="Personal-info">
            <div>
              <h1>Jane Smith</h1>
              <p>Contact: 987-654-3210</p>
              <p>Email: jane.smith@example.com</p>
            </div>
          </div>
        </div>
        <div className="Details" style={{ textAlign: 'left' }}>
          <h2>Professional Details</h2>
          <p>Profession: Interior Designer</p>
          <p>Experience: 6 years</p>
          <p>Rating: 4.2</p>
        </div>
        <div className="Projects" style={{ textAlign: 'left', overflowY: 'auto', maxHeight: '60vh' }}>
          <h2>Projects</h2>
          <ul>
              <li>
                <h3>Cozy Living Space</h3>
                <ul>
                  <li style={{ listStyleType: 'disc' }}>Interior design and decoration for a cozy and modern living space.</li>
                </ul>
              </li>
              <li>
                <h3>Office Renovation</h3>
                <ul>
                  <li style={{ listStyleType: 'disc' }}>Renovation of a corporate office space to enhance productivity and aesthetics.</li>
                </ul>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnotherClientProfile;
