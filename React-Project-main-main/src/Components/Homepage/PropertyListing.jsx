import React, { useState, useEffect } from 'react';

const PropertyListing = ({ handleSignupClick, filteredProperties, handlePropertyClick }) => {
    const [filter, setFilter] = useState('all');
    const [displayedProperties, setDisplayedProperties] = useState([]);

    useEffect(() => {
        if (Array.isArray(filteredProperties)) {
            setDisplayedProperties(filteredProperties);
        }
    }, [filteredProperties]);

    const filterProperties = (type) => {
        setFilter(type.toLowerCase());
        if (type === 'all') {
            setDisplayedProperties(filteredProperties);
        } else {
            const filtered = filteredProperties.filter(property => property.type.toLowerCase() === type.toLowerCase());
            setDisplayedProperties(filtered);
        }
    };

    return (
        <div className="container-xxl py-5 ml-10" id="properties">
            <br />
            <br />
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-end">
                    <div className="text-start mx-auto mb-5 lg:col-span-1 lg:text-left">
                        <h1 className="mb-3 text-3xl lg:text-4xl font-bold">Property Listing</h1>
                        <p className="text-gray-600">
                            Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit
                            diam justo sed rebum.
                        </p>
                    </div>
                    <div className="text-start text-lg-end lg:col-span-1 lg:text-right">
                        <ul className="flex justify-end space-x-2 mb-5">
                            <li>
                                <button className={`border border-primary text-primary font-semibold py-2 px-4 rounded-full hover:bg-white ${filter === 'all' ? 'bg-blue-800 text-white' : ''}`} onClick={() => filterProperties('all')}>Featured</button>
                            </li>
                            <li>
                                <button className={`border border-primary text-primary font-semibold py-2 px-4 rounded-full hover:bg-white ${filter === 'house' ? 'bg-blue-800 text-white' : ''}`} onClick={() => filterProperties('house')}>Houses</button>
                            </li>
                            <li>
                                <button className={`border border-primary text-primary font-semibold py-2 px-4 rounded-full hover:bg-white ${filter === 'land' ? 'bg-blue-800 text-white' : ''}`} onClick={() => filterProperties('land')}>Lands</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="property-list">
                    {Array.isArray(displayedProperties) && displayedProperties.map((property) => (
                        <div key={property._id} className="p-3" onClick={() => handlePropertyClick(property)}>
                            <a className="block relative h-48 rounded overflow-hidden">
                            {property.images.length > 0 && (
                                    <img src={`http://localhost:5000/${property.images[0].replace(/\\/g, '/')}`} alt="Property" className="" />
                                )}
                                <img src={`http://localhost:5000/${property.images[0].replace(/\\/g, '/')}`} alt="property" className="object-cover object-center w-full h-full block"></img>
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{property.type}</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">{property.title}</h2>
                                <p className="mt-1">{property.price}</p>
                            </div>
                            <div className="border-t mt-4 pt-4 border-gray-200 text-center">
                                <p>
                                    <i className="fa fa-map-marker-alt text-primary me-2" />
                                    {property.location}
                                </p>
                                <div className="flex border-t border-gray-200 py-2">
                                    <small className="flex-fill text-center border-end">
                                        <i className="fa fa-ruler-combined text-primary me-2" />
                                        {property.area}
                                    </small>
                                    <small className="flex-fill text-center border-end">
                                        <i className="fa fa-bed text-primary me-2" />
                                        {property.bedrooms} Bed
                                    </small>
                                    <small className="flex-fill text-center">
                                        <i className="fa fa-bath text-primary me-2" />
                                        {property.bathrooms} Bath
                                    </small>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                <br></br>
                <div className="col-12 text-center">
                    <button className="py-3 px-5 bg-blue-800 hover:bg-blue-1000 text-white font-bold rounded-md hover:bg-blue-800" onClick={handleSignupClick}>
                        Browse More Property
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyListing;
