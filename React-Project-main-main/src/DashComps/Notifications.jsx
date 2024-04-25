// Notifications.jsx
import React from 'react';
import './Notifications.css';

const Notifications = ({ notifications }) => {
  // Sample notifications data for demonstration
  const sampleNotifications = [
    'Someone has contacted you about your property.',
    'You have a new message from a client.',
    'Your property listing has been updated.',
  ];

  // If no notifications are provided, use the sample data
  const displayNotifications = notifications.length > 0 ? notifications : sampleNotifications;

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      <ul>
        {displayNotifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
