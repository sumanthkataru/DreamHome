import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

export default function ContactApproved() {
    const [contactRequests, setContactRequests] = useState([]);
    
    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
        const fetchContactRequests = async () => {
            try {
                const response = await fetch(`http://localhost:5000/contactRequests`);
                if (!response.ok) {
                    throw new Error('Failed to fetch contact requests');
                }
                const data = await response.json();
                // Filter messages with status "request"
                const filteredRequests = data.filter(request => request.recipient===userId);
                filteredRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setContactRequests(filteredRequests);
            } catch (error) {
                console.error('Error fetching contact requests:', error);
            }
        };

        fetchContactRequests();
    }, []);

    return (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
            <div className="overflow-y-hidden rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th className="px-5 py-3">Recipient ID</th>
                                <th className="px-5 py-3">Message</th>
                                <th className="px-5 py-3">Created at</th>
                                <th className="px-5 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-500">
                            {contactRequests.map((request, index) => (
                                <tr key={index} className="bg-white">
                                    <td className="border-b border-gray-200 px-5 py-5 text-sm">{request.recipient}</td>
                                    <td className="border-b border-gray-200 px-5 py-5 text-sm">{request.message}</td>
                                    <td className="border-b border-gray-200 px-5 py-5 text-sm">{request.createdAt}</td>
                                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                    <span className="text-xs text-gray-600 sm:text-sm"> Showing {contactRequests.length} Entries </span>
                    {/* Pagination buttons */}
                </div>
            </div>
        </div>
    );
}

// Function to determine status color based on status
function getStatusColor(status) {
    switch (status) {
        case "request":
            return "text-blue-600 bg-blue-200";
        case "accepted":
            return "text-green-600 bg-green-200";
        case "declined":
            return "text-red-600 bg-red-200";
        default:
            return "";
    }
}