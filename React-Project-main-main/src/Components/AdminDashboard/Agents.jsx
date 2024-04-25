import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import AgentPopUp from './AgentPopUp';

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('all');
  const [agentData, setAgentData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/agents');
        const data = await response.json();
        setAgentData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (name) => {
    console.log(`Delete ${name} permanently`);
  };

  const filteredAgents = agentData.filter((agents) => {
    return (
      (agents.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agents.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedProfession === 'all' ||
        agents.profession.toLowerCase() === selectedProfession.toLowerCase())
    );
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black ">Agents</h4>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedProfession('all')}
            className={`px-4 py-2 rounded-md ${
              selectedProfession === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedProfession('architect')}
            className={`px-4 py-2 rounded-md ${
              selectedProfession === 'architect' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            Architect
          </button>
          <button
            onClick={() => setSelectedProfession('contractor')}
            className={`px-4 py-2 rounded-md ${
              selectedProfession === 'contractor' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            Contractor
          </button>
          <button
            onClick={() => setSelectedProfession('interior designer')}
            className={`px-4 py-2 rounded-md ${
              selectedProfession === 'interior designer' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            Interior Designer
          </button>
        </div>
        <div className="flex-grow"></div>
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
        <div className="p-3 xl:p-5 bg-green-50">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
        </div>
        <div className="p-3 text-center xl:p-5 bg-green-50">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
        </div>
        <div className="p-3 text-center xl:p-5 bg-green-50">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Profession</h5>
        </div>
        <div className="p-3 text-center xl:p-5 bg-green-50">
          <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
        </div>
      </div>

      {filteredAgents.map((agents, key) => (
        <div
          className={`grid grid-cols-4 sm:grid-cols-4 ${
            key === filteredAgents.length - 1
              ? ''
              : 'border-b border-stroke dark:border-strokedark'
          }`}
          key={key}
        >
          <div className="flex items-center p-3 xl:p-5">
            <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-green-400 " />
            <p className="hidden ml-2 text-black  sm:block">{agents.name}</p>
          </div>

          <div className="flex items-center justify-center p-3 xl:p-5">
            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-green-400 e" />
            <p className=" ml-2 text-black ">{agents.email}</p>
          </div>

          <div className="flex items-center justify-center p-3 xl:p-5">
            <p className="text-meta-3">{agents.profession}</p>
          </div>

          <div className="flex items-center justify-end space-x-4 p-3 mr-20 xl:p-5">
            <button onClick={() => setSelectedAgent(agents)} className="text-blue-400 hover:underline">
              <FontAwesomeIcon icon={faEye} />
            </button>
            {selectedAgent && selectedAgent._id === agents._id && (
              <AgentPopUp
                agent={selectedAgent}
                onClose={() => setSelectedAgent(null)}
              />
            )}
            <button onClick={() => handleDelete(agents.name)} className="text-red-400 hover:underline">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Agents;
