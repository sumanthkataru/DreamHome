import React, { useState, useEffect } from "react";
import Stats from "./Stats";
import Agents from "./Agents";
import Users from "./Users";
import Agentrequests from "./Agentrequests";
import ChangePassword from "./ChangePassword";
import Messages from './Messages';
import ShowHouses from "./ShowHouses";
import ShowLands from './ShowLands';

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
import { RiHome4Line } from 'react-icons/ri';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [open, setOpen] = useState(0);
  const [activeComponent, setActiveComponent] = useState(null);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [contacts, setContacts] = useState([]);
  const [contactCount, setContactCount] = useState(0);

  useEffect(() => {
    // Fetch contacts and count from the backend API
    fetch("http://localhost:5000/contacts")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.contacts);
        setContactCount(data.count);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="flex h-full w-full">
      <div className="w-1/4">
        <Card className="fixed inset-0 border-none max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4 flex">
            <RiHome4Line style={{ marginRight: '8px', fontSize: '24px' }} />
            <Typography variant="h5" color="blue-gray" onClick={() => handleComponentChange("ShowStats")}>
              Dream Home
            </Typography>
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5 text-gray-500" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Properties
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem onClick={() => handleComponentChange("ShowHouses")}>
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5"
                      />
                    </ListItemPrefix>
                    Houses
                  </ListItem>
                  <ListItem onClick={() => handleComponentChange("ShowLands")}>
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5"
                      />
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
                  className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5 text-gray-500" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Users
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem onClick={() => handleComponentChange("Agent")}>
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5"
                      />
                    </ListItemPrefix>
                    Agents
                  </ListItem>
                  <ListItem onClick={() => handleComponentChange("User")}>
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5"
                      />
                    </ListItemPrefix>
                    Users
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <ListItem className="py-1" onClick={() => handleComponentChange("Agentrequests")}>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5 text-gray-500" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Agent Requests
              </Typography>
            </ListItem>

            <hr className="my-4 border-blue-gray-50" />
            <ListItem onClick={() => handleComponentChange("ShowMessages")}>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5 text-gray-500" />
              </ListItemPrefix>
              Messages
              <ListItemSuffix>
                <Chip
                  value={contactCount.toString()}
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem onClick={() => handleComponentChange("ChangePassword")}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-gray-500" />
              </ListItemPrefix>
              Change Password
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-gray-500" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </div>
      <div className="w-3/4 w-full relative">
        <div className="bg-gray-800 sticky top-0 z-1">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
        <div className="bg-gray-190 w-full p-4 mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" style={{ marginTop: '80px' }}>

          {activeComponent === "ShowLands" && <ShowLands />}
          {activeComponent === "ShowHouses" && <ShowHouses />}
          {activeComponent === "ShowStats" && <Stats />}
          {activeComponent === "Agent" && <Agents />}
          {activeComponent === "User" && <Users />}
          {activeComponent === "ShowMessages" && <Messages />}
          {activeComponent === "Agentrequests" && <Agentrequests />}
          {activeComponent === "ChangePassword" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
}
