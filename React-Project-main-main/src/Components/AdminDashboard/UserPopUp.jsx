import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HeartIcon, PhoneIcon } from "@heroicons/react/24/solid";
import ContactForm from './ContactForm';

const UserPopUp = ({ user, onClose }) => {
    const [showContactForm, setShowContactForm] = useState(false);
    const userId = useSelector(state => state.user.userId);
    const [postedHouses, setPostedHouses] = useState([]);
    const [postedLands, setPostedLands] = useState([]);
    const [totalPostedProperties, setTotalPostedProperties] = useState(0);

    useEffect(() => {
        const fetchPostedHouses = async () => {
            try {
                const housesResponse = await fetch(`http://localhost:5000/houses`);
                if (!housesResponse.ok) {
                    throw new Error('Failed to fetch houses');
                }
                const housesData = await housesResponse.json();
                const filteredHouses = housesData.filter(house => house.userId === user._id);
                setPostedHouses(filteredHouses);
            } catch (error) {
                console.error('Error fetching houses:', error);
            }
        };
    
        fetchPostedHouses();
        const interval1 = setInterval(fetchPostedHouses, 5000);
    
        return () => clearInterval(interval1);
    }, [userId]);
    
    useEffect(() => {
        const fetchPostedLands = async () => {
            try {
                const landsResponse = await fetch(`http://localhost:5000/lands`);
                if (!landsResponse.ok) {
                    throw new Error('Failed to fetch lands');
                }
                const landsData = await landsResponse.json();
                const filteredLands = landsData.filter(land => land.userId === user._id);
                setPostedLands(filteredLands);
            } catch (error) {
                console.error('Error fetching lands:', error);
            }
        };
    
        fetchPostedLands();
        const interval2 = setInterval(fetchPostedLands, 5000);
    
        return () => clearInterval(interval2);
    }, [userId]);
    

    if (!user) {
        return <div>No agent found with the provided id</div>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-100">
    <div className="relative flex flex-col max-w-full md:max-w-[26rem] rounded-xl bg-white text-gray-700 shadow-lg overflow-y-auto max-h-full">
       <div className="flex justify-end">
                <button className="hover:bg-white" onClick={onClose}>
                    &times;
                </button>
            </div>
                <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                            {user.name}
                        </h5>
                        <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="-mt-0.5 h-5 w-5 text-yellow-700"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            {user.rating} Rating
                        </p>
                    </div>
                    <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                        <span className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70">
                            Contact: {user.mobile}
                        </span>
                        <span className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70">
                            Email: {user.email}
                        </span>
                        
                    </div>
                </div>

                {/* Display posted properties */}
                <div className="p-6">
                    <h3>Properties posted by {user.name}:</h3>
                    <div className="mb-6 sm:mb-10 lg:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Posted Houses</h2>
                        {postedHouses.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            
                            {postedHouses.map((house, index) => (
                            <div key={`posted-house-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md">
                                {/* Display house image */}
                                <img src={`http://localhost:5000/${house.images[0].replace(/\\/g, '/')}`} alt={house.title} className="w-full h-48 object-cover" />

                                {/* Display house details */}
                                <div className="p-4">
                                <a href="#" className="block text-xl font-bold text-gray-800 hover:text-blue-500 mb-2">{house.title}</a>
                                <p className="text-gray-600 mb-2">Location: {house.location}</p>
                                <p className="text-gray-600 mb-2">Price: {house.price}</p>
                                <p className="text-gray-600">Square Footage: {house.squareFootage}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                        <h4>Posted Houses : {postedHouses.length}</h4>
                    </div>

                    {/* Posted Lands */}
                    <div className="mb-6 sm:mb-10 lg:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Posted Lands</h2>
                        {postedLands.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {postedLands.map((land, index) => (
                            <div key={`posted-land-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md">
                                {/* Display land image */}
                                <img src={land.images[0]} alt={land.title} className="w-full h-48 object-cover" />

                                {/* Display land details */}
                                <div className="p-4">
                                <a href="#" className="block text-xl font-bold text-gray-800 hover:text-blue-500 mb-2">{land.title}</a>
                                <p className="text-gray-600 mb-2">Location: {land.location}</p>
                                <p className="text-gray-600 mb-2">Price: {land.price}</p>
                                <p className="text-gray-600">Area: {land.area}</p>
                                </div>

                            </div>
                            ))}
                        </div>
                        )}
                        <h4>Posted Lands : {postedLands.length}</h4>
                    </div>
                </div>
                <div className="p-6 pt-3 flex justify-between">
                    <button
                        className="flex items-center justify-center w-1/2 rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => setShowContactForm(true)}
                        data-ripple-light="true"
                    >
                        <PhoneIcon className="h-5 w-5 text-white mr-2" />
                        Contact
                    </button>
                    </div>
                    {showContactForm && (
                    <ContactForm
                        senderId={userId} // Pass the sender ID to the ContactForm component
                        recipientType="Admin" // Or "Architect" based on your logic
                        recipientId={user._id} // Pass the userId of the house owner
                        onClose={() => setShowContactForm(false)}
                    />
                    )}
            </div>
        </div>
    );
};

export default UserPopUp;
