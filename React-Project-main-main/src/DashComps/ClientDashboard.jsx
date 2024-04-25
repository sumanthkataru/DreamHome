import React, { useState } from 'react';
import ContactedUsers from './ContactedUsers';
import AnotherClientProfile from './AnotherClientProfile';
import './AdminDashboard.css';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from './../actions';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Contacted Users');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    Navigate("/");
    alert('Logged out!');
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="admin-header">
          <h2 style={{ color: 'white' }}>Client</h2>
        </div>
        <div
          className={`sidebar-item ${activeTab === 'AnotherClientProfile' ? 'active' : ''}`}
          onClick={() => {
            handleTabClick('AnotherClientProfile');
          }}
        >
          Client Portfolio
        </div>
        <div
          className={`sidebar-item ${activeTab === 'Contacted Users' ? 'active' : ''}`}
          onClick={() => handleTabClick('Contacted Users')}
        >
          Contacted Users
        </div>
        <div className="sidebar-item">Notifications</div>
        <div className="sidebar-item" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <div className="main-content">
        {activeTab === 'AnotherClientProfile' && (
          <AnotherClientProfile />
        )}
        {activeTab === 'Contacted Users' && (
          <ContactedUsers />
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
