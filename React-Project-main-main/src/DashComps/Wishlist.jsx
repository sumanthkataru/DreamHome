// Wishlist.jsx
import React, { useState } from 'react';

const Wishlist = ({ wishlistProperties, onRemoveFromWishlist, onBuy }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWishlist = wishlistProperties.filter((property) =>
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wishlist-container">
      <h2 style={{textAlign:'center'}}>Wishlisted Properties</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search wishlisted properties"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
      {filteredWishlist.length === 0 ? (
        <p>No wishlisted properties yet.</p>
      ) : (
        <div className="property-list">
          {filteredWishlist.map((property) => (
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
                  className="remove-button"
                  onClick={() => onRemoveFromWishlist(property)}
                >
                  Remove from Wishlist
                </button>
                <button className="buy-button" onClick={() => onBuy(property)}>
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
