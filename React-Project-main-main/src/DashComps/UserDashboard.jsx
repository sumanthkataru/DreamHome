// UserDashboard.jsx
import React, { useState } from 'react';
import BuildHome from './BuildHome';
import PropertyBuy from './PropertyBuy';
import Wishlist from './Wishlist';
import SellPropertyForm from './SellPropertyForm';
import Notifications from './Notifications';
import './AdminDashboard.css';
import { PropertyDataProvider } from './PropertyDataContext';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from './../actions';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('BuildHome');
  const [wishlistProperties, setWishlistProperties] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    Navigate("/");
    alert('Logged out!');
  };

  const handleAddToWishlist = (property) => {
    setWishlistProperties([...wishlistProperties, property]);
    handleNotification(`Added property to wishlist: ${property.name}`);
  };

  const handleRemoveFromWishlist = (property) => {
    const updatedWishlist = wishlistProperties.filter(
      (p) => p.id !== property.id
    );
    setWishlistProperties(updatedWishlist);
    handleNotification(`Removed property from wishlist: ${property.name}`);
  };

  const handleNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  return (
    <PropertyDataProvider>
      <div className="admin-dashboard">
        <div className="sidebar">
          <div className="admin-header">
            <h2 style={{ color: 'white' }}>User</h2>
          </div>
          <div
            className={`sidebar-item ${activeTab === 'BuildHome' ? 'active' : ''}`}
            onClick={() => handleTabClick('BuildHome')}
          >
            Build Home
          </div>
          <div
            className={`sidebar-item ${activeTab === 'PropertyBuy' ? 'active' : ''}`}
            onClick={() => handleTabClick('PropertyBuy')}
          >
            Buy Properties
          </div>
          <div
            className={`sidebar-item ${activeTab === 'Wishlist' ? 'active' : ''}`}
            onClick={() => handleTabClick('Wishlist')}
          >
            Wishlist
          </div>
          <div
            className={`sidebar-item ${activeTab === 'SellPropertyForm' ? 'active' : ''}`}
            onClick={() => handleTabClick('SellPropertyForm')}
          >
            Sell Properties
          </div>
          <div
            className={`sidebar-item ${activeTab === 'Notifications' ? 'active' : ''}`}
            onClick={() => handleTabClick('Notifications')}
          >
            Notifications
          </div>
          <div className="sidebar-item" onClick={handleLogout}>
            Logout
          </div>
        </div>

        <div className="main-content">
          {activeTab === 'BuildHome' && <BuildHome />}
          {activeTab === 'PropertyBuy' && (
            <PropertyBuy
              onAddToWishlist={handleAddToWishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onNotification={handleNotification}
              wishlistProperties={wishlistProperties}
            />
          )}
          {activeTab === 'Wishlist' && (
            <Wishlist
              wishlistProperties={wishlistProperties}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onBuy={() => {}}
            />
          )}
          {activeTab === 'SellPropertyForm' && <SellPropertyForm />}
          {activeTab === 'Notifications' && <Notifications notifications={notifications} />}
        </div>
      </div>
    </PropertyDataProvider>
  );
};

export default UserDashboard;
