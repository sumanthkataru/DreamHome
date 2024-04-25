// Homepage.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import PropertyListing from './PropertyListing';
import Agents from './Agents';
import CustSignup from './CustSignup';
import AgentSignup from './AgentSignup';
import Login from './Login';
import ContactUs from './Contactus';
import Reviews from './Reviews';
import Footer from './Footer';
import PropertyDetail from './PropertyDetail';
import AgentDetail from './AgentDetail';
import "./Homepage.css"

const Homepage = () => {
    const [showSignup, setShowSignup] = useState(false);

    const handleSignupClick = () => {
        setShowSignup(true);
    };

    const hideSignupContainer = () => {
        setShowSignup(false);
    };

    const [showAgentSignup, setShowAgentSignup] = useState(false);

    const handleAgentSignupClick = () => {
        setShowAgentSignup(true);
    };

    const hideAgentSignupContainer = () => {
        setShowAgentSignup(false);
    }; 

    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const hideLoginContainer = () => {
        setShowLogin(false);
    };
    
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState(properties); // State to hold filtered properties

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Fetch data from both endpoints concurrently
                const [housesResponse, landsResponse] = await Promise.all([
                    fetch('http://localhost:5000/houses').then(response => response.json()),
                    fetch('http://localhost:5000/lands').then(response => response.json())
                ]);
    
                // Merge the results into a single list of properties
                const mergedProperties = [...housesResponse, ...landsResponse];
    
                // Set fetched properties to state
                setProperties(mergedProperties);
    
                // Set filtered properties initially to all properties
                setFilteredProperties(mergedProperties);
    
                console.log(filteredProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
    
        fetchProperties();
    }, []);
    

    const [agents, setAgents] = useState([]);
    const [filteredAgents, setFilteredAgents] = useState(agents);

    useEffect(() => {
        // Fetch agents from the API
        fetch('http://localhost:5000/agents')
            .then(response => response.json())
            .then(data => {
                setAgents(data);
                setFilteredAgents(data);
            })
            .catch(error => {
                console.error('Error fetching agents:', error);
            });
    }, []);

    // Function to handle search and filter agents
    const handleAgentSearch = (searchCriteria) => {
        const { keyword, type } = searchCriteria;

        const filtered = agents.filter(agent => {
            const keywordMatches = !keyword || Object.values(agent).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(keyword.toLowerCase())
            );
            const typeMatches = !type || agent.designation.toLowerCase().includes(type.toLowerCase());

            return keywordMatches && typeMatches;
        });

        setFilteredAgents(filtered);
    };

    // Function to handle search and filter properties
    const handleSearch = (searchCriteria) => {
        const { keyword, type, location } = searchCriteria;

        const filtered = properties.filter(property => {
            const keywordMatches = !keyword || Object.values(property).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(keyword.toLowerCase())
            );
            const typeMatches = !type || property.title.toLowerCase().includes(type.toLowerCase());
            const locationMatches = !location || property.location.toLowerCase().includes(location.toLowerCase());

            return keywordMatches && typeMatches && locationMatches;
        });

        setFilteredProperties(filtered);
    };

    const [showContactUs, setShowContactUs] = useState(false);

    const handleContactUsClick = () => {
        setShowContactUs(true);
    };

    const hideContactUs = () => {
        setShowContactUs(false);
    }; 

    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showPropertyDetail, setShowPropertyDetail] = useState(false);

    const handlePropertyClick = (property) => {
        setSelectedProperty(property)
        setShowPropertyDetail(true);
    };

    const hidePropertyContainer = () => {
        setSelectedProperty(null)
        setShowPropertyDetail(false);
    };

    const [selectedAgent, setSelectedAgent] = useState(null);
    const [showAgentDetail, setShowAgentDetail] = useState(false);


    const handleAgentClick = (agent) => {
        setSelectedAgent(agent);
        setShowAgentDetail(true);
    };
    
    const hideAgentContainer = () => {
        setSelectedAgent(null);
        setShowAgentDetail(false);
    };

    return (
        <div>
            <Navbar handleSignupClick={handleSignupClick} handleLoginClick={handleLoginClick} handleContactUsClick={handleContactUsClick}/>
            <Header handleSignupClick={handleSignupClick} handleSearch={handleSearch} handleAgentSearch={handleAgentSearch}/>
            <PropertyListing filteredProperties={filteredProperties} handleSignupClick={handleSignupClick} handlePropertyClick={handlePropertyClick}/>
            <Agents agents={filteredAgents} handleSignupClick={handleSignupClick} handleAgentSignupClick={handleAgentSignupClick} handleAgentClick={handleAgentClick} />
            {showSignup && <CustSignup hideSignupContainer={hideSignupContainer} />}
            {showAgentSignup && <AgentSignup hideAgentSignupContainer={hideAgentSignupContainer} />}
            {showLogin && <Login hideLoginContainer={hideLoginContainer}/>}
            {showContactUs && <ContactUs hideContactusContainer={hideContactUs} />}
            {showPropertyDetail && ( 
                        <PropertyDetail property={selectedProperty} hidePropertyContainer={hidePropertyContainer} handleSignupClick={handleSignupClick}/>
                    )}
            {showAgentDetail && (
                <AgentDetail agent={selectedAgent} hideAgentContainer={hideAgentContainer} handleSignupClick={handleSignupClick}/>
            )}
            <Reviews />
            <Footer />
        </div>
    );
};

export default Homepage;
