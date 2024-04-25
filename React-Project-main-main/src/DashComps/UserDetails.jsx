import React, { useState } from 'react';
import UserData from './UserData';
import UserProfile from './UserProfile';

const UserDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsUserProfileVisible(true);
  };

  const handleCloseUserProfile = () => {
    setIsUserProfileVisible(false);
  };

  // Filter data based on the search term
  const filteredData = UserData.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Email"
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
            <th>Email</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="view-icon"
                  onClick={() => handleViewClick(user)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUserProfileVisible && (
        <UserProfile user={selectedUser} onClose={handleCloseUserProfile} />
      )}
    </div>
  );
};

export default UserDetails;
