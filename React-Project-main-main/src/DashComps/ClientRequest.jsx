import React, { useState, useEffect } from 'react';
import './ClientRequest.css';

const ClientRequest = ({ onNewClientRequest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState([
    { id: 11, name: 'Michael Brown', profession: 'Contractor' },
    { id: 12, name: 'Olivia Smith', profession: 'Interior Designer' },
    { id: 13, name: 'David Johnson', profession: 'Architect' },
    { id: 14, name: 'Sophia Williams', profession: 'Contractor' },
    { id: 15, name: 'William Davis', profession: 'Interior Designer' },
    { id: 16, name: 'Emma Miller', profession: 'Architect' },
    { id: 17, name: 'Alexander Wilson', profession: 'Contractor' },
    { id: 18, name: 'Victoria Taylor', profession: 'Interior Designer' },
    { id: 19, name: 'Daniel Clark', profession: 'Architect' },
    { id: 20, name: 'Ava Johnson', profession: 'Contractor' },
    // Add more sample data as needed
  ]);

  const handleAddButtonClick = (user) => {
    // Send the client request to AdminDashboard
    setRequests((prevRequests) => prevRequests.filter((u) => u.id !== user.id));
    onNewClientRequest(user);
  };

  useEffect(() => {
    // Optional: You can add logic here to store requests in localStorage or make an API call
  }, [requests]);

  return (
    <div className="client-request-container">
      <h2>Client Requests</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Profession</th>
            <th>View</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {requests
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.profession}</td>
                <td>
                  <button className="view-icon">View</button>
                </td>
                <td>
                  <button
                    className="add-button"
                    onClick={() => handleAddButtonClick(user)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientRequest;
