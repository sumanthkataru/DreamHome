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

const ShowDesigners = ({ handleSignupClick, handlePropertyClick }) => {
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [designers, setDesigners] = useState([]);
    const [popupDesigner, setPopupDesigner] = useState(null); // State to store selected designer for the popup

    useEffect(() => {
        const fetchDesignersData = async () => {
            try {
                const response = await fetch('http://localhost:5000/agents');
                if (!response.ok) {
                    throw new Error('Failed to fetch agents data');
                }
                const data = await response.json();
                // Filter agents where the profession is "Designer"
                const designerAgents = data.filter(agent => agent.profession === 'Interior Designer');
                setDesigners(designerAgents); // Set the fetched data to the designers state
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDesignersData();
    }, []);

    const handleCardClick = (designer) => {
        setShowPopup(true); // Show the popup when clicking on the card
        setPopupDesigner(designer); // Set the clicked designer data for the popup
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
                    {/* Display designers */}
                    {designers.map((designer, index) => (
                        <Card key={index} className="w-96" onClick={() => handleCardClick(designer)}>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    {designer.name}
                                </Typography>
                                <div className="flex items-center justify-center mb-2"> {/* New: Flex container for location */}
                                    <Typography color="blue-gray" className="font-medium" textGradient>
                                        Designer |
                                    </Typography>
                                    <Typography color="blue-gray" className="font-medium ml-1" textGradient>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600 mr-1" /> {/* New: Location icon */}
                                        {designer.location} {/* New: Place name */}
                                    </Typography>
                                </div>
                            </CardBody>
                            <CardFooter className="flex justify-center gap-7 pt-2"> {/* Updated: justify-end to align icons to the right */}
                                {/* Star rating */}
                                <div className="flex items-center">
                                    {renderRatingStars(designer.rating)} {/* Example rating */}
                                </div>
                                {/* Phone icon */}
                                <Tooltip content="Call">
                                    <Typography as="a" href={`tel:${designer.contact}`} variant="lead" color="blue" textGradient>
                                        <FontAwesomeIcon icon={faPhoneAlt} flip="horizontal" /> {/* Updated: flip="horizontal" to open towards right */}
                                    </Typography>
                                </Tooltip>
                                {/* Email icon */}
                                <Tooltip content="Email">
                                    <Typography as="a" href={`mailto:${designer.email}`} variant="lead" color="blue" textGradient>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </Typography>
                                </Tooltip>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            {showPopup && <AgentPopup agent={popupDesigner} onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default ShowDesigners;
