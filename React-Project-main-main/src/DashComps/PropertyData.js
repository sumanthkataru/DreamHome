// PropertyData.js

async function fetchPropertyData() {
  try {
      const response = await fetch('http://localhost:5000/api/sellProperties');
      const data = await response.json();
      
      const formattedData = data.map(property => ({
          id: property.id,
          type: property.category,
          image:'img/property-5.jpg',
          price: property.price,
          features: property.details,
      }));

      return formattedData;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error for handling in the calling code
  }
}

const propertyData = await fetchPropertyData();

export default propertyData;
