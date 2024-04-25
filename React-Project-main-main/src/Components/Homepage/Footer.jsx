import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          {/* First Column */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Get In Touch</h2>
            <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Location, City, Country</p>
            <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
            <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@example.com</p>
            <div class="d-flex pt-2">
              <a class="btn btn-outline-light btn-social" href="/"><i class="fab fa-twitter"></i></a>
              <a class="btn btn-outline-light btn-social" href="/"><i class="fab fa-facebook-f"></i></a>
              <a class="btn btn-outline-light btn-social" href="/"><i class="fab fa-youtube"></i></a>
              <a class="btn btn-outline-light btn-social" href="/"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Second Column */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Quick Links</h2>
            <nav className="list-none mb-10">
              <li><a className="btn btn-link text-white-50" href="">About Us</a></li>
              <li><a className="btn btn-link text-white-50" href="">Contact Us</a></li>
              <li><a className="btn btn-link text-white-50" href="">Our Services</a></li>
              <li><a className="btn btn-link text-white-50" href="">Privacy Policy</a></li>
              <li><a className="btn btn-link text-white-50" href="">Terms & Condition</a></li>
            </nav>
          </div>

          {/* Third Column */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Photo Gallery</h2>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="col-span-1">
                <img className="w-full rounded bg-gray-200 p-1" src="img/property-3.jpg" alt=""></img>
              </div>
              <div className="col-span-1">
                <img className="w-full rounded bg-gray-200 p-1" src="img/property-5.jpg" alt=""></img>
              </div>
              <div className="col-span-1">
                <img className="w-full rounded bg-gray-200 p-1" src="img/property-3.jpg" alt=""></img>
              </div>
              <div className="col-span-1">
                <img className="w-full rounded bg-gray-200 p-1" src="img/property-5.jpg" alt=""></img>
              </div>
              <div className="col-span-1">
                <img className="w-full rounded bg-gray-200 p-1" src="img/property-3.jpg" alt=""></img>
              </div>
              <div className="col-span-1">
                <img className="w-full rounded bg-gray-200 p-1" src="img/property-5.jpg" alt=""></img>
              </div>
            </div>
          </div>

          {/* Fourth Column */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">NewsLetter</h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-400">Your email</label>
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 bg-opacity-75">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Dream Home</span>
          </a>
          <p className="text-sm text-gray-400 sm:ml-6 sm:mt-0 mt-4">
            © 2023 FDFED —
            <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@IIITS Students</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-400">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            {/* Add other social icons similarly */}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
