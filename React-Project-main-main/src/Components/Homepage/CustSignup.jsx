import React, { useState } from 'react';

const CustSignup = ({ hideSignupContainer }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            try {
                const response = await fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // The user signup was successful
                    const data = await response.json();
                    alert('User signed up successfully:');
                    window.location.reload();
                    // You can perform further actions here after successful signup
                } else {
                    // Handle error response from server
                    const errorData = await response.json();
                    alert('Signup failed:', errorData);
                    // Update state or display an error message to the user
                }
            } catch (error) {
                alert('Error during signup:', error);
                // Handle network errors or other exceptions
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg p-6">
                <div className="flex justify-end">
                    <button className='hover:bg-white' onClick={() => hideSignupContainer()}>&times;</button>
                </div>
                <h2 className="text-2xl font-bold mb-4">Customer Sign Up</h2>
                <form id="cust-signup-form" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="cust-name" className="block mb-1">Name:</label>
                        <input
                            type="text"
                            id="cust-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cust-email" className="block mb-1">Email:</label>
                        <input
                            type="email"
                            id="cust-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cust-mobile" className="block mb-1">Mobile Number:</label>
                        <input
                            type="text"
                            id="cust-mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            required
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cust-password" className="block mb-1">Password:</label>
                        <input
                            type="password"
                            id="cust-password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cust-confirm-password" className="block mb-1">Confirm Password:</label>
                        <input
                            type="password"
                            id="cust-confirm-password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            required
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-800 text-white rounded-md px-4 py-2 hover:bg-blue-600 block mx-auto"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustSignup;