import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";

export default function PostedProperties({ houses, lands }) {

  // Client-side code (example using fetch API)
  const handleDeleteHouse = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteHouse/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      console.log(data);
  
      // Check if the deletion was successful
      if (response.ok) {
        // Display success message
        alert('House deleted successfully');
      } else {
        // Display error message if deletion failed
        alert('Failed to delete house');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleDeleteLand = async (landId) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteLand/${landId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Display success message
        alert('Land deleted successfully');
      } else {
        // Display error message if deletion failed
        alert('Failed to delete land');
      }
    } catch (error) {
      console.error('Error deleting land:', error);
    }
  };
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch houses
        const housesResponse = await fetch(`http://localhost:5000/houses`);
        if (!housesResponse.ok) {
          throw new Error('Failed to fetch houses');
        }
        const housesData = await housesResponse.json();
        // Update houses state
        // setHouses(housesData);

        // Fetch lands
        const landsResponse = await fetch(`http://localhost:5000/lands`);
        if (!landsResponse.ok) {
          throw new Error('Failed to fetch lands');
        }
        const landsData = await landsResponse.json();
        // Update lands state
        // setLands(landsData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    // Call fetchProperties function
    fetchProperties();
  }, []); 


  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        {/* Posted Houses */}
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Posted Houses</h2>
          {houses.map((house, index) => (
            <div key={`house-${index}`} className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
              {/* Display house image */}
              <img src={`http://localhost:5000/${house.images[0].replace(/\\/g, '/')}`} alt={house.title} className="w-32 h-32 sm:w-40 sm:h-40 object-cover" />

              {/* Display house details */}
              <div className="flex flex-1 flex-col justify-between py-4">
                <div>
                  <a href="#" className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">{house.title}</a>
                  <span className="block text-gray-500">Location: {house.location}</span>
                  <span className="block text-gray-500">Price: {house.price}</span>
                </div>
                <div>
                  <span className="mb-1 block font-bold text-gray-800 md:text-lg">Square Footage: {house.squareFootage}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col justify-between py-4">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mr-2">Update</button>
                <button onClick={() => handleDeleteHouse(house._id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Posted Lands */}
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Posted Lands</h2>
          {lands.map((land, index) => (
            <div key={`land-${index}`} className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
              {/* Display land image */}
              <img src={land.images[0]} alt={land.title} className="w-32 h-32 sm:w-40 sm:h-40 object-cover" />

              {/* Display land details */}
              <div className="flex flex-1 flex-col justify-between py-4">
                <div>
                  <a href="#" className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">{land.title}</a>
                  <span className="block text-gray-500">Location: {land.location}</span>
                  <span className="block text-gray-500">Price: {land.price}</span>
                </div>
                <div>
                  <span className="mb-1 block font-bold text-gray-800 md:text-lg">Area: {land.area}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col justify-between py-4">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mr-2">Update</button>
                <button onClick={() => handleDeleteLand(land._id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
