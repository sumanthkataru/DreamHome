import React, { useState, useEffect } from 'react';
import HousePopup from './HousePopup';

const ShowHouses = ({ handleSignupClick, handlePropertyClick }) => {
    const [houses, setHouses] = useState([]);
    const [displayedHouses, setDisplayedHouses] = useState([]);

    useEffect(() => {
        // Fetch data from the backend and set it to houses state
        const fetchHousesData = async () => {
            try {
                const response = await fetch('http://localhost:5000/houses');
                if (!response.ok) {
                    throw new Error('Failed to fetch houses data');
                }
                const data = await response.json();
                setHouses(data); // Set the fetched data to the houses state
                setDisplayedHouses(data); // Initially set displayedHouses to all houses
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchHousesData();
    }, []);

    const [searchCriteria, setSearchCriteria] = useState({
        search: '',
        priceMin: '',
        priceMax: '',
        location: '',
        yearBuilt: '',
        squareFootage: '',
        bedrooms: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Construct query parameters based on the search criteria
        const queryParams = new URLSearchParams(searchCriteria);
    
        try {
            let filteredHouses;
    
            if (queryParams.toString() !== '') {
                // Filter houses based on search criteria
                filteredHouses = houses.filter(house => {
                    // Check if house price is within the specified range
                    const priceInRange = 
                        (!searchCriteria.priceMin || parseInt(house.price) >= parseInt(searchCriteria.priceMin)) &&
                        (!searchCriteria.priceMax || parseInt(house.price) <= parseInt(searchCriteria.priceMax));
    
                    // Check if house location matches the specified location
                    const locationMatch = 
                        !searchCriteria.location || house.location.toLowerCase().includes(searchCriteria.location.toLowerCase());
    
                    // Check if house year built is within the specified range
                    const yearBuiltInRange =
                        (!searchCriteria.yearBuiltMin || parseInt(house.yearBuilt) >= parseInt(searchCriteria.yearBuiltMin)) &&
                        (!searchCriteria.yearBuiltMax || parseInt(house.yearBuilt) <= parseInt(searchCriteria.yearBuiltMax));
    
                    // Check if house square footage is within the specified range
                    const squareFootageInRange =
                        (!searchCriteria.squareFootageMin || parseInt(house.squareFootage) >= parseInt(searchCriteria.squareFootageMin)) &&
                        (!searchCriteria.squareFootageMax || parseInt(house.squareFootage) <= parseInt(searchCriteria.squareFootageMax));
    
                    // Check if house has the specified number of bedrooms
                    const bedroomsMatch =
                        !searchCriteria.bedrooms || parseInt(house.bedrooms) === parseInt(searchCriteria.bedrooms);
    
                    // Combine all filtering conditions
                    return priceInRange && locationMatch && yearBuiltInRange && squareFootageInRange && bedroomsMatch;
                });
            } else {
                // If no search criteria are provided, display all houses
                filteredHouses = houses;
            }
        
            setDisplayedHouses(filteredHouses); // Set the filtered or all houses to the displayedHouses state
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [selectedHouse, setSelectedHouse] = useState(null); // State to track selected house

    const handleHouseClick = (house) => {
        setSelectedHouse(house); // Set the selected house when clicked
    };

    const closePopup = () => {
        setSelectedHouse(null); // Close the popup
    };
    
    

    return (
        <div>
            {/* Your search form code */}
            <div className="m-10 w-screen max-w-screen-md">
                <div className="flex flex-col">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="relative mb-6 md:mb-10 w-full">
                                {/* Search by name, type, manufacturer, etc. */}
                                <input
                                    type="text"
                                    name="search"
                                    value={searchCriteria.search}
                                    onChange={handleInputChange}
                                    className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    placeholder="Search by name, type, manufacturer, etc"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {/* Price range */}
                                <div className="flex flex-col">
                                    <label htmlFor="priceMin" className="text-sm font-medium text-stone-600">Min Price</label>
                                    <input
                                        type="number"
                                        id="priceMin"
                                        name="priceMin"
                                        value={searchCriteria.priceMin}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="priceMax" className="text-sm font-medium text-stone-600">Max Price</label>
                                    <input
                                        type="number"
                                        id="priceMax"
                                        name="priceMax"
                                        value={searchCriteria.priceMax}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                {/* Location */}
                                <div className="flex flex-col">
                                    <label htmlFor="location" className="text-sm font-medium text-stone-600">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={searchCriteria.location}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                {/* Year built */}
                                <div className="flex flex-col">
                                    <label htmlFor="yearBuilt" className="text-sm font-medium text-stone-600">Year Built</label>
                                    <input
                                        type="number"
                                        id="yearBuilt"
                                        name="yearBuilt"
                                        value={searchCriteria.yearBuilt}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                {/* Square footage */}
                                <div className="flex flex-col">
                                    <label htmlFor="squareFootage" className="text-sm font-medium text-stone-600">Square Footage</label>
                                    <input
                                        type="number"
                                        id="squareFootage"
                                        name="squareFootage"
                                        value={searchCriteria.squareFootage}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                {/* Bedrooms */}
                                <div className="flex flex-col">
                                    <label htmlFor="bedrooms" className="text-sm font-medium text-stone-600">Bedrooms</label>
                                    <input
                                        type="number"
                                        id="bedrooms"
                                        name="bedrooms"
                                        value={searchCriteria.bedrooms}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6 justify-end">
                                <button type="reset" className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">Reset</button>
                                <button type="submit" className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <section className="flex flex-col items-center bg-white">
                <h1 className="mt-10 text-4xl font-bold text-gray-800">New Listings</h1>
                <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-8">
                    {/* Map over displayedHouses to render each house */}
                    {displayedHouses.map((house) => (
                        <article key={house._id} onClick={() => handleHouseClick(house)} className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
                            <div>
                                {/* Render the first image from the images array */}
                                {house.images.length > 0 && (
                                     <img src={`http://localhost:5000/${house.images[0].replace(/\\/g, '/')}`} alt="Property" className="" />
                                )}
                            </div>

                            <div className="p-4">
                                <div className="pb-6">
                                    <a href="" className="text-lg hover:text-green-600 font-medium duration-500 ease-in-out">{house.title}</a>
                                </div>

                                <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-6">
                                    <li className="mr-4 flex items-center text-left">
                                        <span className="mr-2 text-2xl text-green-600">1200sqf</span>
                                    </li>

                                    <li className="mr-4 flex items-center text-left">
                                        <span className="mr-2 text-2xl text-green-600">4 Beds</span>
                                    </li>

                                    <li className="flex items-center text-left">
                                        <span className="mr-2 text-2xl text-green-600">4 Baths</span>
                                    </li>
                                </ul>

                                <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                                    <li className="text-left">
                                        <span className="text-sm text-gray-400">Price</span>
                                        <p className="m-0 text-base font-medium">{house.price}</p>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            {/* Popup Component */}
            {selectedHouse && (
                <HousePopup
                    house={selectedHouse}
                    onClose={closePopup}
                />
            )}
        </div>
    );
};

export default ShowHouses;