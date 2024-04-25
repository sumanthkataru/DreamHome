import React, { useState,useEffect  } from "react";
import {useDispatch, useSelector } from 'react-redux';
import Profile from "./Profile";
import ContactRequest from "./ContactRequest";
import ContactApproved from "./ContactApproved";
import ChangePassword from "./ChangePassword";
import Notifications from "./Notifications";
import { RiHome4Line } from 'react-icons/ri';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  KeyIcon,
  BellAlertIcon,
  PhoneArrowDownLeftIcon
} from "@heroicons/react/24/solid";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

 
export default function ClientDashboard() {
    const [open, setOpen] = useState(0);
    const [activeComponent, setActiveComponent] = useState(null);
    const userId = useSelector(state => state.user.userId);
  
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
  
    const handleComponentChange = (componentName) => {
      setActiveComponent(componentName);
    };

      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
      
 
    return (
        
      <div className="flex h-full w-full " >

        <div className="w-1/4"> 
        <Card className="fixed inset-0 border-none max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4 flex">
        <RiHome4Line style={{ marginRight: '8px' , fontSize: '24px'}} /> 
            <Typography variant="h5" color="blue-gray">
            Dream Home
            </Typography>
        </div>
        <List>
            <hr className="my-4 border-blue-gray-50" />
            <ListItem onClick={()=> handleComponentChange("Profile")}>
            <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
            <ListItemSuffix>
                <Chip value="" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem onClick={()=> handleComponentChange("ContactRequest")}>
            <ListItemPrefix>
                <PhoneArrowDownLeftIcon className="h-5 w-5" />
            </ListItemPrefix>
            Contact Request
            <ListItemSuffix>
                <Chip value="5" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem onClick={()=> handleComponentChange("ContactApproved")}>
            <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Contact Approved
            <ListItemSuffix>
                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem onClick={()=> handleComponentChange("ChangePassword")}>
            <ListItemPrefix>
                <KeyIcon className="h-5 w-5" />
            </ListItemPrefix>
            Change Password
            <ListItemSuffix>
                <Chip value="" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem onClick={()=>handleComponentChange("Notifications")}>
            <ListItemPrefix>
                <BellAlertIcon className="h-5 w-5" />
            </ListItemPrefix>
            Notifications
            <ListItemSuffix>
                <Chip value="12" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
            </ListItem>
            <ListItem>
            <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
            </ListItem>
        </List>
        </Card>
        </div>
        <div className="w-3/4 w-full ml-10"> 
        <div className="bg-gray-800">
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
     <div>
        {activeComponent==="Profile" && <Profile />}  
        {activeComponent==="ContactRequest" && <ContactRequest />}    
        {activeComponent==="ContactApproved" && <ContactApproved />} 
        {activeComponent==="ChangePassword" && <ChangePassword />} 
        {activeComponent==="Notifications" && <Notifications />} 
        </div>
      </div>
    </div>
    );
}