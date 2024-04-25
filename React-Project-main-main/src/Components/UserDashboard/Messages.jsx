import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ContactForm from './ContactForm';
export default function Messages({ onMessagesChange }) {
    const [messages, setMessages] = useState([]);
    const userId = useSelector(state => state.user.userId);
    const [showContactForm, setShowContactForm] = useState(false);
    const [agents, setAgents] = useState([]);

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
                onMessagesChange(filteredMessages.length);
            } catch (error) {
                console.error('Error fetching contact requests:', error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);

        return () => clearInterval(interval);
    }, [userId]); // Include userId as a dependency

    // Fetching Agents every 10 seconds
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch(`http://localhost:5000/agents`);
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const AgentData = await response.json();
                setAgents(AgentData);
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        };

        fetchAgents();
        const interval = setInterval(fetchAgents, 100);

        return () => clearInterval(interval);
    }, []); // No dependencies, fetchUsers should only run once

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
            {messages.map((message, index) => {
                return (
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
                            <div className="p-6 pt-3 flex justify-between">

                                <button
                                    className="flex items-center justify-center w-1/2 rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={() => setShowContactForm(true)}
                                    data-ripple-light="true"
                                >

                                    Reply
                                </button>
                            </div>
                            {showContactForm && (
                                <ContactForm
                                    senderId={userId} // Pass the sender ID to the ContactForm component
                                    recipientType="Agent" // Or "Architect" based on your logic
                                    recipientId={message.sender} // Pass the userId of the house owner
                                    onClose={() => setShowContactForm(false)}
                                />
                            )}
                        </div>
                    </div>
                </article>
            );
            })}
        </div>
    );
}
