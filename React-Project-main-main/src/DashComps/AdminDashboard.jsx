import React, { useState } from 'react';
import UserDetails from './UserDetails';
import ClientDetail from './ClientDetail';
import ClientRequest from './ClientRequest';
import './AdminDashboard.css';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from './../actions';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('UserDetails');
  const [clientDetails, setClientDetails] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleNewClientRequest = (clientRequest) => {
    setClientDetails((prevClientDetails) => [...prevClientDetails, clientRequest]);
  };

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
          <h2 style={{ color: 'white' }}>Admin</h2>
        </div>
        <div
          className={`sidebar-item ${activeTab === 'UserDetails' ? 'active' : ''}`}
          onClick={() => handleTabClick('UserDetails')}
        >
          User Details
        </div>
        <div
          className={`sidebar-item ${activeTab === 'ClientDetail' ? 'active' : ''}`}
          onClick={() => handleTabClick('ClientDetail')}
        >
          Client Details
        </div>
        <div
          className={`sidebar-item ${activeTab === 'ClientRequest' ? 'active' : ''}`}
          onClick={() => {
            handleTabClick('ClientRequest');
            setNotificationCount(0); // Reset notification count when client requests tab is clicked
          }}
        >
          Client Requests
          {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
        </div>
        <div className="sidebar-item">Notifications</div>
        <div className="sidebar-item" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <div className="main-content">
        {activeTab === 'UserDetails' && <UserDetails />}
        {activeTab === 'ClientDetail' && (
        <ClientDetail
          requests={clientDetails}
          setRequests={setClientDetails}
        />
        )}
        {activeTab === 'ClientRequest' && (
          <ClientRequest onNewClientRequest={handleNewClientRequest} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
