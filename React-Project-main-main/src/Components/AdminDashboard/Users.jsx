import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash,faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import UserPopUp from './UserPopUp';


const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState([]);
  const [showUserPopUp, setShowUserPopUp] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API when the component mounts
    const fetchData = async () => {
      try {
        console.log("Fetching Data....")
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = userData.filter((users) => {
    return (
      users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = (name) => {
    console.log(`Delete ${name} permanently`);
  };


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-#6748B p-2 rounded-md">
        Users
      </h4>

      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          {/* ... (existing profession buttons) */}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 dark:bg-meta-4 dark:border-strokedark "
          />
        </div>
      </div>

      <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
        <div className="p-3 xl:p-5 bg-green-50">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Name
          </h5>
        </div>
        <div className="p-3 text-center xl:p-5 bg-green-50">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Email
          </h5>
        </div>
        <div className="p-3 text-center xl:p-5 bg-green-50">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Mobile No
          </h5>
        </div>
        <div className="p-3 text-center xl:p-5 bg-green-50">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Actions
          </h5>
        </div>
      </div>

      {filteredUsers.map((users, key) => (
        <div
          className={`grid grid-cols-4 sm:grid-cols-4 ${key === filteredUsers.length - 1
              ? ''
              : 'border-b border-stroke dark:border-strokedark'
            }`}
          key={key}
        >
          <div className="flex items-center p-3 xl:p-5">
            <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-green-400 " />
            <p className="hidden ml-2 text-gray-160  sm:block">{users.name}</p>
          </div>

          <div className="flex items-center justify-center p-3 xl:p-5">
            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-green-400 " />
            <p className="hidden ml-2 text-gray-160 sm:block">{users.email}</p>
          </div>

          <div className="flex items-center space-x-7 p-3 xl:p-5">
            <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-green-400" />
            <p className="hidden ml-4 text-gray-160 sm:block">{users.mobile}</p>
          </div>
          <div className="flex items-center justify-end space-x-4 p-3 mr-20 xl:p-5">
            <button onClick={() => setSelectedUser(users)} className="text-blue-400 hover:underline">
              <FontAwesomeIcon icon={faEye} />
            </button>
            {selectedUser && selectedUser._id === users._id && (
              <UserPopUp
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
              />
            )}
            <button onClick={() => handleDelete(users.name)} className="text-red-400 hover:underline">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
