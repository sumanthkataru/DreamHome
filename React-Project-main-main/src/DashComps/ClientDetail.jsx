import React, { useState } from 'react';
import './ClientDetails.css'; // Import the corresponding CSS file

const ClientDetail = ({ requests = [], setRequests }) => {
  const [selectedClient, setSelectedClient] = useState('');
  const [clickedClientIndex, setClickedClientIndex] = useState('');

  const handleViewClick = (client, index) => {
    setSelectedClient(client);
    setClickedClientIndex(index);

  };

  const handleColorChange = (index) => {
    // Check if the current client's index matches the clicked index
    return index === clickedClientIndex ? 'selected' : '';
  };

  return (
    <div className="client-detail-container">
      <h2>Clients</h2>
      <table className="client-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Profession</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {requests && requests.length > 0 ? (
            requests.map((client, index) => (
              <tr key={client.id}>
                <td>{index + 1}</td>
                <td
                  className={handleColorChange(index)}
                  onClick={() => handleViewClick(client, index)}
                >
                  {client.name}
                </td>
                <td>{client.profession}</td>
                <td>
                  <button
                    className="view-icon"
                    onClick={() => handleViewClick(client, index)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No clients available</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedClient && (
        <div className="selected-client-details">
          <h3>Selected Client Details</h3>
          <p>Name: {selectedClient.name}</p>
          <p>Profession: {selectedClient.profession}</p>
          {/* Add more client details as needed */}
        </div>
      )}
    </div>
  );
};

export default ClientDetail;
