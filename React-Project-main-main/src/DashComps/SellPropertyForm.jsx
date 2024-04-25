import React, { useState } from 'react';

const SellPropertyForm = () => {
    const [formData, setFormData] = useState({
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        squareFootage: '',
        yearBuilt: '',
        description: '',
        contactInfo: '',
        images: [] // Change 'image' to an array to store multiple images
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to Array
        setFormData({
            ...formData,
            images: files.slice(0, 10) // Limit the number of images to 10
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();
        for (let key in formData) {
            if (key === 'images') {
                formData[key].forEach((image, index) => {
                    formDataToSend.append(`image${index}`, image); // Append each image with unique key
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:5000/api/sellProperty', {
                method: 'POST',
                body: formDataToSend
            });

            if (response.ok) {
                console.log('Uploaded');
            } else {
                console.error('Failed to Upload');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Reset the form
        setFormData({
            location: '',
            price: '',
            bedrooms: '',
            bathrooms: '',
            squareFootage: '',
            yearBuilt: '',
            description: '',
            contactInfo: '',
            images: []
        });
    };

  return (
    <div className="p-5">
        {/* Form Fields */}
        <div className="mt-8 p-4">
            <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1 mx-2">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input placeholder="Location" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                    </div>
                </div>
                <div className="w-full flex-1 mx-2">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input placeholder="Price" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full mx-2 flex-1">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input placeholder="Number of Bedrooms" type="number" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                    </div>
                </div>
                <div className="w-full mx-2 flex-1">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input placeholder="Number of Bathrooms" type="number" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full mx-2 flex-1">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input placeholder="Square Footage" type="number" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                    </div>
                </div>
                <div className="w-full mx-2 flex-1">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input placeholder="Year Built" type="number" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                    </div>
                </div>
            </div>
            <div className="w-full mx-2">
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <textarea placeholder="Description" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" rows="4"></textarea>
                </div>
            </div>
            <div className="w-full mx-2">
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input placeholder="Contact Information" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                  <div className="w-full mx-2">
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            {/* Allow selecting multiple images */}
                            <input type="file" accept="image/*" onChange={handleImageChange} multiple className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                        </div>
                  </div>
              </div>
            {/* Navigation Buttons */}
            <div className="flex p-2 mt-4">
                    {/* Previous button */}
                    <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-200 bg-gray-100 text-gray-700 border duration-200 ease-in-out border-gray-600 transition">Previous</button>
                    {/* Submit button */}
                    <div className="flex-auto flex flex-row-reverse">
                        <button onClick={handleSubmit} className="text-base ml-2 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-600 bg-teal-600 text-teal-100 border duration-200 ease-in-out border-teal-600 transition">Submit</button>
                    </div>
                </div>
        </div>
    </div>
);
};

export default SellPropertyForm;