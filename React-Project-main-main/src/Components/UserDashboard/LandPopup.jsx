import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { HeartIcon, PhoneIcon } from "@heroicons/react/24/solid";
import ContactForm from './ContactForm';

const LandPopup = ({ land, onClose }) => {

  const [showContactForm, setShowContactForm] = useState(false);

  const userId = useSelector(state => state.user.userId);

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch('http://localhost:5000/wishlistLand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          landId: land._id,
        }),
      });
      if (response.ok) {
        alert('Land added to wishlist successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add land to wishlist');
      }
    } catch (error) {
      console.error('Error adding land to wishlist:', error);
      alert('Failed to add land to wishlist');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div className="flex justify-end">
          <button className='hover:bg-white' onClick={onClose}>&times;</button>
        </div>
        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          {/* Assuming images are present in the 'land' object */}
          {land.images && land.images.length > 0 && (
            <img src={`http://localhost:5000/${land.images[0].replace(/\\/g, '/')}`} alt="Land" className="" />
          )}
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        </div>
        <div class="p-6">
          <div class="mb-3 flex items-center justify-between">
            <h5 class="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
              {land.title}, {land.location}
            </h5>
          </div>
          <div class="group mt-8 inline-flex flex-wrap items-center gap-3">
            <span
              data-tooltip-target="price"
              class="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
            >
              Price: ${land.price}
            </span>
            <span
              data-tooltip-target="area"
              class="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
            >
              Area: {land.area} Sq Ft
            </span>
            {/* Add similar spans for other details like bathrooms, squareFootage, yearBuilt, etc. */}
          </div>

          <p class="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
            {land.description}
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
            recipientId={land.userId} // Pass the userId of the house owner
            onClose={() => setShowContactForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LandPopup;
