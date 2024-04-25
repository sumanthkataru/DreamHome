import React from 'react';
import './UserProfile.css';  // Make sure to link this to your actual UserProfile.css file
import properties from './PropertiesData';

const UserProfile = ({ user, onClose }) => {
  const userProperties = properties.filter((property) => property.id === user.id);

  return (
    <div className="user-profile-overlay active">
      <div className="user-profile">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="personal-info">
          <div className="details">
            <h2>{user.name}</h2>
            <p>Contact: {user.contact}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
        <div className="projects">
          <h3>Posted Properties:</h3>
          <ul>
            {userProperties && userProperties.length > 0 ? (
              userProperties.map((property) => (
                <li key={property.id}>
                  <strong>{property.propertyName}</strong>
                  <p>Category: {property.category}</p>
                </li>
              ))
            ) : (
              <li>No properties posted</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
