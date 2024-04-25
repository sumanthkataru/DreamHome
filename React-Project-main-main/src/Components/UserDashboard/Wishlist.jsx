import React from "react";

export default function Wishlist({ wishlistHouses, wishlistLands }) {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        {/* Wishlist Houses */}
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Wishlist Houses</h2>
          {wishlistHouses.map((house, index) => (
            <div key={`wishlist-house-${index}`} className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
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
                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg">Delete</button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Wishlist Lands */}
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Wishlist Lands</h2>
          {wishlistLands.map((land, index) => (
            <div key={`wishlist-land-${index}`} className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
              {/* Display land image */}
              <img src={`http://localhost:5000/${land.images[0].replace(/\\/g, '/')}`} alt={land.title} className="w-32 h-32 sm:w-40 sm:h-40 object-cover" />

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
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mr-2">Remove</button>
                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg">Contact</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
