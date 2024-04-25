import React, { useState } from 'react';

const ContactForm = ({ senderId, recipientType, recipientId, onClose }) => {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic can be added here if needed

    try {
      const response = await fetch('http://localhost:5000/contactRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: senderId,
          recipientType: recipientType,
          recipient: recipientId,
          message: message,
        }),
      });
      if (response.ok) {
        alert('Message sent successfully!');
        onClose();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const hideLoginContainer = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full md:w-1/3 bg-white rounded-lg p-6">
        <div className="flex justify-end">
          <button className="hover:bg-white" onClick={hideLoginContainer}>
            &times;
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Contact</h2>
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-1">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-800 text-white rounded-md px-4 py-2 hover:bg-blue-600 block mx-auto"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
