import React, { useState } from 'react';
import { PhoneIcon } from "@heroicons/react/24/solid";
import ContactForm from './ContactForm';
import {useSelector } from 'react-redux';

const AgentPopUp = ({ agent, onClose }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const userId = useSelector(state => state.user.userId);
  if (!agent) {
    return <div>No agent found with the provided id</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div className="flex justify-end">
          <button className='hover:bg-white' onClick={onClose}>&times;</button>
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-900 antialiased">
              {agent.name}
            </h5>
            <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-900 antialiased">
              {agent.rating} Rating
            </p>
          </div>
          <div className="group mt-8">
            <div className="mb-4">
              <p className="font-medium">Contact:</p>
              <p>{agent.mobile}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Email:</p>
              <p>{agent.email}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Profession:</p>
              <p>{agent.profession}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Experience:</p>
              <p>{agent.experience}</p>
            </div>
          </div>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
            {/* Agent description */}
          </p>
        </div>
        <div className="p-6 pt-3 flex justify-between">
          <button
            className="flex items-center justify-center w-1/2 rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
            senderId={userId}
            recipientType="Agent"
            recipientId={agent._id}
            onClose={() => setShowContactForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AgentPopUp;
