import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PaymentFormHouse from './PaymentFormHouse'

const PostHouse = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
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

    const userId = useSelector(state => state.user.userId); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 10); // Limit to 10 images
        setFormData({
            ...formData,
            images: files
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Add userId to the form data
        formData.userId = userId;

        const formDataToSend = new FormData();

        for (let key in formData) {
            if (key === 'images') {
                formData[key].forEach(image => {
                    formDataToSend.append('images', image); // Append each image to the 'images' field
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:5000/houses', {
                method: 'POST',
                body: formDataToSend
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('Failed to Post House');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to Post House');
        }

        // Reset the form
        setFormData({
            title: '',
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
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">Post A House</h2>
           {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 p-4" >
                <div className="mt-8 p-4">
                    <div className="w-full mx-2">
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input name="title" placeholder="Title" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full flex-1 mx-2">
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input name="location" placeholder="Location" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="w-full flex-1 mx-2">
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input name="price" placeholder="Price" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    {/* Add other input fields with the appropriate name attribute */}
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full mx-2 flex-1">
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input name="bedrooms" placeholder="Number of Bedrooms" type="number" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="w-full mx-2 flex-1">
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input name="bathrooms" placeholder="Number of Bathrooms" type="number" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    {/* Add more input fields here */}
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full mx-2 flex-1">
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input name="squareFootage" placeholder="Square Footage" type="number" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="w-full mx-2 flex-1">
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input name="yearBuilt" placeholder="Year Built" type="number" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-2">
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <textarea name="description" placeholder="Description" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" rows="4" onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="w-full mx-2">
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input name="contactInfo" placeholder="Contact Information" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full mx-2">
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                {/* Allow selecting multiple images */}
                                <input name="images" type="file" accept="image/*" onChange={handleImageChange} className="p-1 px-2 appearance-none outline-none w-full text-gray-800"  multiple/>
                            </div>
                        </div>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex p-2 mt-4">
                        <div className="flex-auto flex flex-row-reverse">
                            <button type='submit' className="text-base ml-2 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-blue-700 bg-blue-700 text-white border duration-200 ease-in-out border-blue-700 transition">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
           ) : ( 
            <PaymentFormHouse setSubmitted={setSubmitted}/>
           )}
        </div>
    );
};

export default PostHouse;
