import React, { useState } from 'react';

const Header = ({ handleSignupClick,handleLoginClick ,handleSearch,handleAgentSearch }) => {

    const [searchInput, setSearchInput] = useState('');
    const [houseType, setHouseType] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');

    const handleSearchClick = () => {
        // Prepare search criteria object
        const searchCriteria = {
            keyword: searchInput.trim(),
            type: houseType.trim(),
            location: propertyLocation.trim(),
        };

        // Pass the search criteria object to the handleSearch function
        handleSearch(searchCriteria);
        handleAgentSearch(searchCriteria);
    };


    return (
        <div>
            <section class="bg-white">
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                            Find A <span class="colour-blue-800">Perfect Home</span> to live with your family
                        </h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            One can find houses and lands to buy and agents helpful for building their home
                        </p>
                        <button href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" 
                            onClick={handleSignupClick}>
                            Get started
                            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3Jhd3BpeGVsb2ZmaWNlMThfYV9yZWFsaXN0aWNfcGhvdG9fb2Zfc2lkZV9wZXJzcGVjdGl2ZV9vZl9hX21vZF82Y2EzZWI4ZC1iZGYxLTRkOTAtOWNmMC1mNjNkMDM0N2Q5ZWVfMi5qcGc.jpg" alt="mockup" />
                    </div>
                </div>
            </section>

            <div class="flex justify-center">
                <div class="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                <div class="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                            className="bg-gray-100 outline-none"
                            type="text"
                            placeholder="Article name or keyword..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <div class="flex bg-gray-100 p-4 space-x-4 rounded-lg">
                    <select
                        className="bg-gray-100 outline-none"
                        value={houseType}
                        onChange={(e) => setHouseType(e.target.value)}
                    >
                        <option value="" disabled selected>Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="villa">villa</option>
                    </select>
                </div>
                <div class="flex bg-gray-100 p-4 space-x-4 rounded-lg">
                    <select
                        className="bg-gray-100 outline-none"
                        value={propertyLocation}
                        onChange={(e) => setPropertyLocation(e.target.value)}
                    >
                        <option value="" disabled selected>Location</option>
                        <option value="suburbia">suburbia</option>
                        <option value="urbantown">urbantown</option>
                    </select>
                </div>
                <button
                    className={`bg-blue-800 border border-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-800`}
                    onClick={handleSearchClick}
                >
                    Search
                </button>
                </div>
            </div>
        </div>
    )
};

export default Header;
