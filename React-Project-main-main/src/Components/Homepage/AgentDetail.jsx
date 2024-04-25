import React from 'react';

const AgentDetail = ({ agent, hideAgentContainer, handleSignupClick }) => {
    const handleClick = (event) => {
        event.target.classList.toggle('text-gray-500');
        event.target.classList.toggle('text-red-500');
        event.target.classList.toggle('bg-gray-200');
        event.target.classList.toggle('bg-white');
    };

    return (
        <div className="fixed inset-0 z-40 overflow-auto flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full md:w-2/3 bg-white rounded-lg p-5">
                <div className="flex justify-end">
                    <button className="hover:bg-white" onClick={() => hideAgentContainer()}>&times;</button>
                </div>
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-10 py-10 mx-auto">
                        <div className="mx-auto flex flex-wrap">
                            <div className="lg:w-1/2 lg:px-4 lg:py-2 w-full mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    {agent.profession}
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                    {agent.name}
                                </h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-indigo-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-indigo-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>

                                        <span className="text-gray-600 ml-3">4 Reviews</span>
                                    </span>
                                </div>
                                <br></br>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h3>Experience</h3>
                                            </td>
                                            <td>
                                                <p>: {agent.experience}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h3>Contact:</h3>
                                            </td>
                                            <td>
                                                <p>: {agent.mobile}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h3>Email:</h3>
                                            </td>
                                            <td>
                                                <p>: {agent.email}</p>
                                            </td>
                                        </tr>
                                        {/* Add more fields below */}
                                        <tr>
                                            <td>
                                                <h3>Education:</h3>
                                            </td>
                                            <td>
                                                <p>: {agent.education}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h3>Certifications:</h3>
                                            </td>
                                            <td>
                                                <p>: {agent.certifications}</p>
                                            </td>
                                        </tr>
                                        {/* Add more fields as needed */}
                                    </tbody>
                                </table>

                                <br></br>
                                <ul>
                                    <li>
                                        <h2>Specializations:</h2>
                                        <p>{agent.specializations}</p>
                                    </li>
                                </ul>
                                <br></br>
                                <ul>
                                    <li>
                                        <h2>Languages:</h2>
                                        <p>{agent.languages}</p>
                                    </li>
                                </ul>
                                <br></br>
                                <ul>
                                    <li>
                                        <h2>Description:</h2>
                                        <p>{agent.description}</p>
                                    </li>
                                </ul>
                                <br></br>
                                <button
                                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                    onClick={handleSignupClick}
                                >
                                    More Info
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AgentDetail;
