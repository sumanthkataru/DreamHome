// BuildHome.jsx
import React, { useState } from 'react';
import './BuildHome.css';
import clientDetails from './clientDetails';
import ClientPortfolio from './ClientPortfolio';

const BuildHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  const filteredData = clientDetails.filter((item) =>
    item.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (name, email) => {
    alert(`Contacted ${name}`);
  };

  const handleViewClick = (client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  return (
    <div className="build-home-container">
      <h2>Build Home</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by profession"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <table className="client-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Profession</th>
            <th>View</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((client, index) => (
            <tr key={client.id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.profession}</td>
              <td>
                <button className="view-icon" onClick={() => handleViewClick(client)}>
                  View
                </button>
              </td>
              <td>
                <button
                  className="contact-button"
                  onClick={() => handleContactClick(client.name, client.email)}
                >
                  Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the ClientPortfolio modal if a client is selected */}
      {selectedClient && (
        <ClientPortfolio client={selectedClient} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default BuildHome;
