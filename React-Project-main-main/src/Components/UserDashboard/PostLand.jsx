import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PaymentForm from './PaymentForm';

const PostLand = () => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        area: '',
        description: '',
        contactInfo: '',
        images: []
    });
    const [submitted, setSubmitted] = useState(false);
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
        formData.userId = userId;
        
    
        const formDataToSend = new FormData();// Append userId to formDataToSend
    
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
            const response = await fetch('http://localhost:5000/lands', {
                method: 'POST',
                body: formDataToSend
            });
    
            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('Failed to Upload Land');
            }
        } catch (error) {
            alert('Error:', error);
        }
    
        setFormData({
            title: '',
            location: '',
            price: '',
            area: '',
            description: '',
            contactInfo: '',
            images: [] // Reset userId field
        });
        
    };
    

    return (
        <div className="p-5">
            {/* Form Fields */}
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">Post Land</h2>
            {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 p-4" >
            <div className="mt-8 p-4">
                <div className="w-full mx-2">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full flex-1 mx-2">
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Location"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                            />
                        </div>
                    </div>
                    <div className="w-full flex-1 mx-2">
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full mx-2">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            placeholder="Area (in acres)"
                            type="number"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                    </div>
                </div>
                <div className="w-full mx-2">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                            rows="4"
                        ></textarea>
                    </div>
                </div>
                <div className="w-full mx-2">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <input
                            name="contactInfo"
                            value={formData.contactInfo}
                            onChange={handleChange}
                            placeholder="Contact Information"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full mx-2">
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            {/* Allow selecting multiple images */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                multiple
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                            />
                        </div>
                    </div>
                </div>
                {/* Navigation Buttons */}
                <div className="flex p-2 mt-4">
                    {/* Submit button */}
                    <div className="flex-auto flex flex-row-reverse">
                        <button type='submit' className="text-base ml-2 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-blue-700 bg-blue-700 text-white border duration-200 ease-in-out border-blue-700 transition">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            </form>
            ) : (
                <PaymentForm setSubmitted={setSubmitted}/>
            )}
        </div>
    );
};

export default PostLand;
