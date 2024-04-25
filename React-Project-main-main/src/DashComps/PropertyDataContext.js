// PropertyDataContext.js
import React, { createContext, useContext, useState } from 'react';
import propertyData from './PropertyData';

const PropertyDataContext = createContext();

export const PropertyDataProvider = ({ children }) => {
  const [data, setData] = useState(propertyData);

  const addProperty = (newProperty) => {
    setData([...data, newProperty]);
  };

  return (
    <PropertyDataContext.Provider value={{ propertyData: data, addProperty }}>
      {children}
    </PropertyDataContext.Provider>
  );
};

export const usePropertyData = () => {
  const context = useContext(PropertyDataContext);
  if (!context) {
    throw new Error('usePropertyData must be used within a PropertyDataProvider');
  }
  return context;
};

export default PropertyDataContext;
