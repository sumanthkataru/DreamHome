import React from 'react';

const Navbar = ({ handleSignupClick, handleLoginClick, handleContactUsClick }) => {
    return(
        <div className="sticky top-1 z-20 bg-white">
            <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span class="ml-3 text-xl">Dream Home</span>
                </a>
                <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a href='/ ' class="mr-5 hover:text-gray-900">About</a>
                    <a href='/' class="mr-5 hover:text-gray-900">Properties</a>
                    <a href='/' class="mr-5 hover:text-gray-900">Agents</a>
                    <a href='/' class="mr-5 hover:text-gray-900">Reviews</a>          
                </nav>
                <button className="mr-5 hover:text-gray-900 hover:bg-white" onClick={handleContactUsClick}>
                    Contact Us
                </button>
                <button className={`bg-blue-700 border border-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-800`} onClick={handleLoginClick}>
                    Login
                </button>
                &nbsp;&nbsp;
                <button className={`bg-blue-700 border border-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-800`} onClick={handleSignupClick}>
                    Signup
                </button>
            </div>
            </header>
        </div>
    )
}

export default Navbar;