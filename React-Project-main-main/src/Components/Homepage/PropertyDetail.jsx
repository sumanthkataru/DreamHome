import React from 'react';

const PropertyDetail = ({ property, hidePropertyContainer, handleSignupClick }) => {

    const handleClick = (event) => {
        event.target.classList.toggle('text-gray-500');
        event.target.classList.toggle('text-red-500');
        event.target.classList.toggle('bg-gray-200');
        event.target.classList.toggle('bg-white');
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full md:w-2/3 bg-white rounded-lg p-5">
                <div className="flex justify-end">
                    <button className='hover:bg-white' onClick={() => hidePropertyContainer()}>&times;</button>
                </div>
                <section class="text-gray-600 body-font overflow-hidden">
                    <div class="container px-10 py-10 mx-auto">
                        <div class="mx-auto flex flex-wrap">
                            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-coveryimage.com/400x400 object-center rounded" src="img/property-3.jpg"></img>
                            <div class="lg:w-1/2 lg:px-4 lg:py-2 w-full mt-6 lg:mt-0">
                                <h2 class="text-sm title-font text-gray-500 tracking-widest">{property.type}</h2>
                                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{property.title}</h1>
                                <div class="flex mb-4">
                                    <span class="flex items-center">
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span class="text-gray-600 ml-3">4 Reviews</span>
                                    </span>
                                </div>
                                <div class="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    <p>{property.location}</p>
                                </div>
                                <br></br>
                                <div class="flex">
                                    <h2>Area    : </h2>&nbsp;
                                    <p>{property.area}</p>
                                </div>
                                <div class="flex">
                                    <h2>Bedrooms    : </h2>&nbsp;
                                    <p>{property.bedrooms}</p>
                                </div>
                                <div class="flex">
                                    <h2>Bathrooms    : </h2>&nbsp;
                                    <p>{property.bathrooms}</p>
                                </div>
                                <br></br>
                                <div class="flex">
                                    <span class="title-font font-medium text-2xl text-gray-900">${property.price}</span>
                                    <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={handleSignupClick}>More Info</button>
                                    <button
                                        className="rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-gray-500 bg-gray-200 ml-4 hover:bg-white"
                                        onClick={handleClick}
                                    >
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PropertyDetail;
