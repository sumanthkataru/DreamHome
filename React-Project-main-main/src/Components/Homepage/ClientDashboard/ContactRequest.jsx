import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

export default function ContactRequest(){
  const [messages, setMessages] = useState([]);
  const userId = useSelector(state => state.user.userId);

  useEffect(() => {
      const fetchMessages = async () => {
          try {
              const response = await fetch(`http://localhost:5000/contactRequests`);
              if (!response.ok) {
                  throw new Error('Failed to fetch contact requests');
              }
              const data = await response.json();
              // Filter messages where the recipient id matches the current user's id
              const filteredMessages = data.filter(message => message.recipient === userId && message.status === 'request');
              setMessages(filteredMessages);
          } catch (error) {
              console.error('Error fetching contact requests:', error);
          }
      };

      fetchMessages();
      const interval=setInterval(fetchMessages,5000);
      
      return () => clearInterval(interval);
  }, [userId]); // Include userId as a dependency

  const handleAction = async (id, status) => {
      try {
          const response = await fetch(`http://localhost:5000/contactRequest/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ status })
          });
          if (!response.ok) {
              throw new Error(`Failed to ${status} contact request`);
          }
      } catch (error) {
          console.error(`Error ${status} contact request:`, error);
      }
  };
  return (
    <div className="bg-gray-100 px-1 py-1">
        {messages.map((message, index) => (
            <article key={index} className="mx-auto my-10 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center">
                <div className="py-4 sm:py-8">
                    <a href="#" className="mb-6 block text-2xl font-medium text-gray-700">{message.title}</a>
                    <p className="mb-6 text-gray-500">{message.message}</p>
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src="/images/ddHJYlQqOzyOKm4CSCY8o.png" alt="Simon Lewis" />
                        <p className="ml-4 w-56">
                            <strong className="block font-medium text-gray-700">{message.sender}</strong>
                            <span className="text-sm text-gray-400">{message.createdAt}</span>
                        </p>
                    </div>
                    <div>
                        <button class="order-3 mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition duration-300" onClick={() => handleAction(message._id, 'accepted')}>Accept</button>
                        <button class="order-3 mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition duration-300" onClick={() => handleAction(message._id, 'declined')}>Decline</button>
                    </div>
                </div>
            </article>
        ))}
    </div>
);
}