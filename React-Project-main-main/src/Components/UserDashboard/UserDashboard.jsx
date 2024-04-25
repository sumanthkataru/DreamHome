import React, { useState,useEffect } from "react";
import { RiHome4Line } from 'react-icons/ri';
import {useDispatch, useSelector } from 'react-redux';

import PostLand from "./PostLand";
import PostHouse from "./PostHouse";
import PostedProperties from "./PostedProperties";
import ShowHouses from "./ShowHouses";
import ShowLands from "./ShowLands";
import Contacts from "./Contacts";
import Wishlist from "./Wishlist";
import Messages from "./Messages";
import ShowArchitects from "./ShowArchitects";
import ShowContractors from "./ShowContractors";
import ShowDesigners from "./ShowDesigners";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
  UserIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

 
export default function UserDashboard() {
    const [open, setOpen] = useState(0);
    const [activeComponent, setActiveComponent] = useState(null);
    const dispatch = useDispatch();
    
    const [houses, setHouses] = useState([]);
    const [lands, setLands] = useState([]);
    const [postedHouses, setPostedHouses] = useState([]);
    const [postedLands, setPostedLands] = useState([]);
    const [wishlistHouses, setWishlistHouses] = useState([]);
    const [wishlistLands, setWishlistLands] = useState([]);
    const [totalPostedProperties, setTotalPostedProperties] = useState(0);
    const userId = useSelector(state => state.user.userId);

    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
  
    const handleComponentChange = (componentName) => {
      setActiveComponent(componentName);
    };
    
      useEffect(() => {
        const fetchProperties = async () => {
          try {
            // Fetch houses
            const housesResponse = await fetch(`http://localhost:5000/houses`);
            if (!housesResponse.ok) {
              throw new Error('Failed to fetch houses');
            }
            const housesData = await housesResponse.json();
            setHouses(housesData);
    
            // Fetch lands
            const landsResponse = await fetch(`http://localhost:5000/lands`);
            if (!landsResponse.ok) {
              throw new Error('Failed to fetch lands');
            }
            const landsData = await landsResponse.json();
            setLands(landsData);
          } catch (error) {
            console.error('Error fetching properties:', error);
          }
        };
    
        fetchProperties();
        const interval1 = setInterval(fetchProperties, 5000);

        return () => clearInterval(interval1);
      }, []);
    
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      } 
      useEffect(() => {
        const fetchPostedProperties = ()=>{
            // Filter posted houses
            const filteredHouses = houses.filter(house => house.userId === userId);
            setPostedHouses(filteredHouses);
        
            // Filter posted lands
            const filteredLands = lands.filter(land => land.userId === userId);
            setPostedLands(filteredLands);
        
            // Calculate total posted properties
            const totalProperties = filteredHouses.length + filteredLands.length;
            setTotalPostedProperties(totalProperties);
        }
        fetchPostedProperties();

        const interval2 = setInterval(fetchPostedProperties, 5000);

        return () => clearInterval(interval2);
      }, [houses, lands, userId]);

      useEffect(() => {
        // Fetch wishlist houses for the specific userID
        const fetchWishlistData = async () => {
            try {
                const responseHouses = await fetch(`http://localhost:5000/wishlistHouses`);
                const responseLands = await fetch(`http://localhost:5000/wishlistLands`);
                
                if (!responseHouses.ok || !responseLands.ok) {
                    throw new Error('Failed to fetch wishlist data');
                }
    
                const dataHouses = await responseHouses.json();
                const dataLands = await responseLands.json();
    
                // Filter wishlist houses and lands based on userID
                const userWishlistHouses = dataHouses.filter(item => item.userId === userId);
                const userWishlistLands = dataLands.filter(item => item.userId === userId);
    
                // Extract houseIDs and landIDs from filtered wishlist items
                const houseIDs = userWishlistHouses.map(item => item.houseId);
                const landIDs = userWishlistLands.map(item => item.landId);
    
                // Filter houses and lands based on extracted IDs
                const wishlistHouseDetails = houses.filter(house => houseIDs.includes(house._id));
                const wishlistLandDetails = lands.filter(land => landIDs.includes(land._id));
    
                // Update wishlist houses and lands states with the filtered details
                setWishlistHouses(wishlistHouseDetails);
                setWishlistLands(wishlistLandDetails);
            } catch (error) {
                console.error('Error fetching wishlist data:', error);
            }
        };
    
        // Initial fetch
        fetchWishlistData();
    
        // Fetch wishlist data every 5 seconds
        const interval = setInterval(fetchWishlistData, 5000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [userId, houses, lands]);
    
    
 
    const handleLogout = () => {
        // Dispatch action to update Redux state
        dispatch({ type: 'LOGOUT' });
        // Show alert
        alert('User logged out successfully!');
        window.location.href = '/';
    };

    const [contactRequestsCount, setContactRequestsCount] = useState(0);

    // Function to handle contact requests change
    const handleContactRequestsChange = (count) => {
        setContactRequestsCount(count);
    };

    const [messagesCount, setMessagesCount] = useState(0);

    // Function to handle contact requests change
    const onMessagesChange = (count) => {
        setMessagesCount(count);
    };

    return (
        <div className="flex h-full w-full"  >
        <div className="w-1/4"> 
        <Card className="fixed inset-0 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  ">
        <div className="mb-2 p-4 flex">
            <RiHome4Line style={{ marginRight: '8px' , fontSize: '24px'}} />
            <Typography variant="h5" color="blue-gray">
            Dream Home
            </Typography>
        </div>
        <List>
            <Accordion
            open={open === 1}
            icon={
                <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
            }
            >
            <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                    <HomeIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                    Properties
                </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0">
                <ListItem onClick={()=>handleComponentChange("ShowHouses")}>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Houses
                </ListItem>
                <ListItem onClick={()=>handleComponentChange("ShowLands")}>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Lands
                </ListItem>
                </List>
            </AccordionBody>
            </Accordion>
            <Accordion
            open={open === 2}
            icon={
                <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                />
            }
            >
            <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <ListItemPrefix>
                    <UserIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                    Agents
                </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0">
                <ListItem onClick={()=>handleComponentChange("ShowArchitects")}>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Architects
                </ListItem>
                <ListItem onClick={()=>handleComponentChange("ShowContractors")}>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Contractors
                </ListItem>
                <ListItem onClick={()=>handleComponentChange("ShowDesigners")}>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Interior Designers
                </ListItem>
                </List>
            </AccordionBody>
            </Accordion>
            <Accordion
            open={open === 3}
            icon={
                <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                />
            }
            >
            <ListItem className="p-0" selected={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                <ListItemPrefix>
                    <ArrowUpIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                    Post Property
                </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0">
                <ListItem onClick={()=>handleComponentChange("PostLand")}>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Land
                </ListItem>
                <ListItem onClick={()=>handleComponentChange("PostHouse")}>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    House
                </ListItem>
                </List>
            </AccordionBody>
            </Accordion>
            <hr className="my-4 border-blue-gray-50" />
            <ListItem onClick={() => handleComponentChange("PostedProperties")}>
            <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Posted Properties
            <ListItemSuffix>
                <Chip  value={totalPostedProperties} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem onClick={() => handleComponentChange("Wishlist")}>
            <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            WishList
            <ListItemSuffix>
                <Chip value={wishlistHouses.length} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem onClick={() => handleComponentChange("Contacts")}>
            <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Contacts
            <ListItemSuffix>
                <Chip value={contactRequestsCount} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem onClick={() => handleComponentChange("Messages")}>
            <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Messages
            <ListItemSuffix>
                <Chip value={messagesCount} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem onClick={handleLogout}>
            <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
            </ListItem>
        </List>
        </Card>
        </div>
        <div className="w-3/4 w-full ml-"> 
        <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="hidden sm:flex items-center mx-auto">
            <div className="flex space-x-4">
              
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
    <div className="w-3/4 p-4 " style={{marginLeft: '10rem'}}>
            {activeComponent === "ShowLands" && <ShowLands/>}
            {activeComponent === "ShowHouses" && <ShowHouses />}
            {activeComponent === "PostLand" && <PostLand />}
            {activeComponent === "PostHouse" && <PostHouse />}
            {activeComponent === "PostedProperties" && <PostedProperties houses={postedHouses} lands={postedLands} />}
            {activeComponent === "Contacts" && <Contacts onContactRequestsChange={handleContactRequestsChange}/>}
            {activeComponent === "Wishlist" && 
                <Wishlist
                    wishlistHouses={wishlistHouses}
                    wishlistLands={wishlistLands}
                />
            }
            {activeComponent === "Messages" && <Messages />}
            {activeComponent === "ShowArchitects" && <ShowArchitects />}
            {activeComponent === "ShowContractors" && <ShowContractors />}
            {activeComponent === "ShowDesigners" && <ShowDesigners />}
        </div>
      </div>
        
        </div>
    );
}