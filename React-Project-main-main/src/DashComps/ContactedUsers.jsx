// ContactedUsers.jsx
import React, { useState } from 'react';
import './ContactedUsers.css'; // You can use the same or similar CSS as BuildHome.css

const ContactedUsers = () => {
  const initialContactedUsers = [
    { id: 1, name: 'Sanjana', email: 'sanjana@gmail.com' },
    { id: 2, name: 'Meghana', email: 'meghana@gmail.com' },
    { id: 3, name: 'Sumanth', email: 'sumanth@gmail.com' },
    { id: 4, name: 'Dhrushina', email: 'dhrushina@gmail.com' },
    { id: 5, name: 'Satish', email: 'satish@gmail.com' },
  ];

  const [contactedUsers, setContactedUsers] = useState(initialContactedUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = contactedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contacted-users-container">
      <h2>Contacted Users</h2>

      {/* Search Bar */}
      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <table className="contacted-users-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="view-icon">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactedUsers;
