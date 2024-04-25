// PropertyBuy.jsx
import React, { useState, useEffect } from 'react';
import './PropertyBuy.css';
import propertyData from './PropertyData';

const PropertyBuy = ({ onAddToWishlist, onNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addedToWishlist, setAddedToWishlist] = useState([]);

  const handleBuy = (property) => {
    // Add logic for buying a property (optional)
    alert(`Buying property: ${property.type}`);
  };

  const handleAddToWishlist = (property) => {
    onAddToWishlist(property);
    setAddedToWishlist((prev) => [...prev, property.id]);
    onNotification(`Added property to wishlist: ${property.type}`);
  };

  const isAddedToWishlist = (property) => addedToWishlist.includes(property.id);

  const filteredProperties = propertyData.filter((property) =>
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setAddedToWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(addedToWishlist));
  }, [addedToWishlist]);

  return (
    <div className="property-buy-container">
      <h2 className="buy-heading">Buy Properties</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by property type (land/house)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
      <div className="property-list">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-item">
            <img
              src={property.image}
              alt={`Property ${property.type}`}
              className="property-image"
            />
            <div className="property-details">
              <p>Property: {property.type.toUpperCase()}</p>
              <p>Price: {property.price}</p>
              <ul>
                {property.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button
                className={`wishlist-button${isAddedToWishlist(property) ? ' added' : ''}`}
                onClick={() => handleAddToWishlist(property)}
              >
                {isAddedToWishlist(property) ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
              <button className="buy-button" onClick={() => handleBuy(property)}>
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBuy;
