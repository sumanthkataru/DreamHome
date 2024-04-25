// ClientPortfolio.jsx
import React from 'react';
import './ClientPortfolio.css';

const ClientPortfolio = ({ client, onClose }) => {
  const selectedClient = client;

  if (!selectedClient) {
    return null;
  }

  return (
      <div className={`client-portfolio-overlay ${selectedClient ? 'active' : ''}`}>
      <div className="client-portfolio-container">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="header">
          <div className="personal-info">
            {/* <div className="prof-img">
              <img src="public/img/property-5.jpg" alt="Client" className="profile-image" />
            </div> */}
            <div>
              <h1>{client.name}</h1>
              <p>Contact: {client.contactNo}</p>
              <p>Email: {client.email}</p>
            </div>
          </div>
        </div>
        <div className="details" style={{ textAlign: 'left' }}>
          <h2>Professional Details</h2>
          <p>Profession: {client.profession}</p>
          <p>Experience: {client.experience}</p>
          <p>Rating: {client.rating}</p>
        </div>
        <div className="projects" style={{ textAlign: 'left', overflowY: 'auto', maxHeight: '60vh' }}>
          <h2>Projects</h2>
          <ul>
            {client.projects.map((project, index) => (
              <li key={index}>
                <h3>{project.title}</h3>
                <ul>
                  <li style={{ listStyleType: 'disc' }}>{project.overview}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientPortfolio;
