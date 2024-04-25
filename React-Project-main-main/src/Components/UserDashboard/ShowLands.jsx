import React, { useState, useEffect } from 'react';
import LandPopup from './LandPopup';

const ShowLands = ({ handleSignupClick, handlePropertyClick }) => {
    const [lands, setLands] = useState([]);
    const [displayedLands, setDisplayedLands] = useState([]);

    useEffect(() => {
        // Fetch data from the backend and set it to lands state
        const fetchLandsData = async () => {
            try {
                const response = await fetch('http://localhost:5000/lands');
                if (!response.ok) {
                    throw new Error('Failed to fetch lands data');
                }
                const data = await response.json();
                setLands(data); // Set the fetched data to the lands state
                setDisplayedLands(data); // Initially set displayedLands to all lands
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLandsData();
    }, []);

    const [searchCriteria, setSearchCriteria] = useState({
        search: '',
        priceMin: '',
        priceMax: '',
        location: '',
        areaMin: '',
        areaMax: ''
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
            let filteredLands;
    
            if (queryParams.toString() !== '') {
                // Filter lands based on search criteria
                filteredLands = lands.filter(land => {
                    // Check if land price is within the specified range
                    const priceInRange = 
                        (!searchCriteria.priceMin || parseInt(land.price) >= parseInt(searchCriteria.priceMin)) &&
                        (!searchCriteria.priceMax || parseInt(land.price) <= parseInt(searchCriteria.priceMax));
    
                    // Check if land location matches the specified location
                    const locationMatch = 
                        !searchCriteria.location || land.location.toLowerCase().includes(searchCriteria.location.toLowerCase());
    
                    // Check if land area is within the specified range
                    const areaInRange =
                        (!searchCriteria.areaMin || parseInt(land.area) >= parseInt(searchCriteria.areaMin)) &&
                        (!searchCriteria.areaMax || parseInt(land.area) <= parseInt(searchCriteria.areaMax));
    
                    // Combine all filtering conditions
                    return priceInRange && locationMatch && areaInRange;
                });
            } else {
                // If no search criteria are provided, display all lands
                filteredLands = lands;
            }
        
            setDisplayedLands(filteredLands); // Set the filtered or all lands to the displayedLands state
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [selectedLand, setSelectedLand] = useState(null); // State to track selected house

    const handleLandClick = (land) => {
        setSelectedLand(land); // Set the selected house when clicked
    };

    const closePopup = () => {
        setSelectedLand(null); // Close the popup
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
                                {/* Area range */}
                                <div className="flex flex-col">
                                    <label htmlFor="areaMin" className="text-sm font-medium text-stone-600">Min Area</label>
                                    <input
                                        type="number"
                                        id="areaMin"
                                        name="areaMin"
                                        value={searchCriteria.areaMin}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="areaMax" className="text-sm font-medium text-stone-600">Max Area</label>
                                    <input
                                        type="number"
                                        id="areaMax"
                                        name="areaMax"
                                        value={searchCriteria.areaMax}
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
                    {/* Map over displayedLands to render each land */}
                    {displayedLands.map((land) => (
                        <article key={land._id} onClick={() => handleLandClick(land)} className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
                            <div>
                                {/* Render the first image from the images array */}
                                {land.images.length > 0 && (
                                    <img src={`http://localhost:5000/${land.images[0].replace(/\\/g, '/')}`} alt="Property" className="" />
                                )}
                            </div>

                            <div className="p-4">
                                <div className="pb-6">
                                    <a href="#" className="text-lg hover:text-green-600 font-medium duration-500 ease-in-out">{land.title}</a>
                                    {/* Display additional fields */}
                                    <p className="text-gray-600">{land.location}</p>
                                </div>

                                <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-6">
                                    <li className="mr-4 flex items-center text-left">
                                        <span className="mr-2 text-2xl text-green-600">{land.area} acres</span>
                                    </li>
                                </ul>

                                <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                                    <li className="text-left">
                                        <span className="text-sm text-gray-400">Price</span>
                                        <p className="m-0 text-base font-medium">{land.price}</p>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            {selectedLand && (
                <LandPopup
                    land={selectedLand}
                    onClose={closePopup}
                />
            )}
        </div>
    );
};

export default ShowLands;
