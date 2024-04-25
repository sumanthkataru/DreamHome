import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { HeartIcon, PhoneIcon } from "@heroicons/react/24/solid";
import ContactForm from './ContactForm';

const HousePopup = ({ house, onClose }) => {
  
  const [showContactForm, setShowContactForm] = useState(false);

  const userId = useSelector(state => state.user.userId);

  const handleAddToWishlist = async () => {
    try {
        const response = await fetch('http://localhost:5000/wishlistHouse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId, // Replace 'userId' with the actual userId
                houseId: house._id,
            }),
        });
        if (response.ok) {
            alert('House added to wishlist successfully!');
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to add house to wishlist');
        }
    } catch (error) {
        console.error('Error adding house to wishlist:', error);
        alert('Failed to add house to wishlist');
    }
};
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <div className="flex justify-end">
                    <button className='hover:bg-white' onClick={onClose}>&times;</button>
                </div>
                <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    {house.images.length > 0 && (
                        <img src={`http://localhost:5000/${house.images[0].replace(/\\/g, '/')}`} alt="Property" className="" />
                    )}
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                </div>
      <div class="p-6">
        <div class="mb-3 flex items-center justify-between">
          <h5 class="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
            {house.title}, {house.location}
          </h5>
          <p class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {house.bedrooms} Bedrooms
          </p>
        </div>
        <div class="group mt-8 inline-flex flex-wrap items-center gap-3">
          <span
            data-tooltip-target="price"
            class="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
            Price: ${house.price}
          </span>
          <span
            data-tooltip-target="bedrooms"
            class="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
            {house.bedrooms} Bedrooms
          </span>
          <span
            data-tooltip-target="bathrooms"
            class="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
            {house.bathrooms} Bathrooms
          </span>
          <span
            data-tooltip-target="squareFootage"
            class="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
            {house.squareFootage} Sq Ft
          </span>
          <span
            data-tooltip-target="yearBuilt"
            class="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
            Built in {house.yearBuilt}
          </span>
          <span
            data-tooltip-target="contactInfo"
            class="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
            Contact: {house.contactInfo}
          </span>
        </div>
        
        <p class="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
          {house.description}
        </p>
      </div>
      
      <div className="p-6 pt-3 flex justify-between">
        <button
                    className="flex items-center justify-center w-1/2 rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={handleAddToWishlist}
                    data-ripple-light="true"
                >
                    <HeartIcon className="h-5 w-5 text-white" />
                    Wishlist
                </button>

                <button
            className="flex items-center justify-center w-1/2 rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => setShowContactForm(true)}
            data-ripple-light="true"
          >
            <PhoneIcon className="h-5 w-5 text-white" />
            Contact
          </button>
        </div>

        {/* Contact form modal */}
        {showContactForm && (
          <ContactForm
            senderId={userId} // Pass the sender ID to the ContactForm component
            recipientType="User" // Or "Architect" based on your logic
            recipientId={house.userId} // Pass the userId of the house owner
            onClose={() => setShowContactForm(false)}
          />
        )}
    </div>
    </div>
  );
};

export default HousePopup;
