import React, { useState, useEffect } from 'react';
import AgentPopup from './AgentPopup'; 
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt'; // New: Location icon

const ShowContractors = ({ handleSignupClick, handlePropertyClick }) => {
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [contractors, setContractors] = useState([]);
    const [popupContractor, setPopupContractor] = useState(null); // State to store clicked contractor data

    useEffect(() => {
        const fetchContractorsData = async () => {
            try {
                const response = await fetch('http://localhost:5000/agents');
                if (!response.ok) {
                    throw new Error('Failed to fetch agents data');
                }
                const data = await response.json();
                // Filter agents where the profession is "Contractor"
                const contractorAgents = data.filter(agent => agent.profession === 'Contractor');
                setContractors(contractorAgents); // Set the fetched data to the contractors state
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchContractorsData();
    }, []);

    const handleCardClick = (contractor) => {
        setShowPopup(true); // Show the popup when clicking on the card
        setPopupContractor(contractor); // Set the clicked contractor data for the popup
    };

    const renderRatingStars = (rating) => {
        const filledStars = Math.floor(rating);
        const starIcons = [];
    
        // Add solid stars based on the rating number
        for (let i = 0; i < filledStars; i++) {
          starIcons.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500 mr-1" />);
        }
    
        // Add remaining regular stars if rating is not a whole number
        if (rating % 1 !== 0) {
          starIcons.push(<FontAwesomeIcon key={filledStars} icon={faStar} className="far fa-star text-yellow-500 mr-1" />);
        }
    
        return starIcons;
    };

    return (
        <div>
            <div className="m-10 w-screen max-w-screen-md">
                <div className="flex flex-row">
                    {/* Display contractors */}
                    {contractors.map((contractor, index) => (
                        <Card key={index} className="w-96" onClick={() => handleCardClick(contractor)}>

                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    {contractor.name}
                                </Typography>
                                <div className="flex items-center justify-center mb-2"> {/* New: Flex container for location */}
                                    <Typography color="blue-gray" className="font-medium" textGradient>
                                        Contractor |
                                    </Typography>
                                    <Typography color="blue-gray" className="font-medium ml-1" textGradient>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600 mr-1" /> {/* New: Location icon */}
                                        {contractor.location} {/* New: Place name */}
                                    </Typography>
                                </div>
                            </CardBody>
                            <CardFooter className="flex justify-center gap-7 pt-2"> {/* Updated: justify-end to align icons to the right */}
                                {/* Star rating */}
                                <div className="flex items-center">
                                    {renderRatingStars(contractor.rating)} {/* Example rating */}
                                </div>
                                {/* Phone icon */}
                                <Tooltip content="Call">
                                    <Typography as="a" href={`tel:${contractor.contact}`} variant="lead" color="blue" textGradient>
                                        <FontAwesomeIcon icon={faPhoneAlt} flip="horizontal" /> {/* Updated: flip="horizontal" to open towards right */}
                                    </Typography>
                                </Tooltip>
                                {/* Email icon */}
                                <Tooltip content="Email">
                                    <Typography as="a" href={`mailto:${contractor.email}`} variant="lead" color="blue" textGradient>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </Typography>
                                </Tooltip>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            {showPopup && <AgentPopup agent={popupContractor} onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default ShowContractors;
