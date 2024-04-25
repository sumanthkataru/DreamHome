import React, { useState } from 'react';// Import your login action
import { useDispatch ,useSelector} from 'react-redux';
import { setUserInfo } from '../../actions'; 
import { useNavigate } from 'react-router-dom';

const Login = ({ hideLoginContainer}) => {// Get the dispatch function
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const userId = useSelector(state => state.user.userId);
    const userType = useSelector(state => state.user.userType);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
    
        if (isValid) {
            const userResponse = await fetch("http://localhost:5000/users");
            const userResponseJSON = await userResponse.json();
            const userFiltered = userResponseJSON.filter(
                (user) => user.email === formData.email
            );
    
            if (userFiltered.length === 0) {
                const agentsResponse = await fetch("http://localhost:5000/agents");
                const agentsResponseJSON = await agentsResponse.json();
                const agentsFiltered = agentsResponseJSON.filter(
                    (agent) => agent.email === formData.email
                );
                
                if (agentsFiltered.length === 0) {
                    alert("Please enter valid details");
                } else {
                    alert(`Logged in Successfully as Agent: ${agentsFiltered[0].name} (${agentsFiltered[0].email})`);
                    dispatch(setUserInfo(agentsFiltered[0]._id, 'agent'));
                    navigate('/client');
                }
            } else {
                const loggedInUser = userFiltered[0];
    
                if (loggedInUser.is_admin) {
                    alert(`Logged in Successfully as Admin: ${loggedInUser.name} (${loggedInUser.email})`);
                    dispatch(setUserInfo(loggedInUser._id, 'admin'));
                    navigate('/admin');
                } else {
                    alert(`Logged in Successfully as User: ${loggedInUser.name} (${loggedInUser.email})`);
                    dispatch(setUserInfo(loggedInUser._id, 'user'));
                    navigate('/user');
                }
            }
        }
    };
        

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full md:w-1/3 bg-white rounded-lg p-6">
                <div className="flex justify-end">
                    <button className='hover:bg-white' onClick={() => hideLoginContainer()}>&times;</button>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form id="cust-signup-form" onSubmit={handleSubmit}>
                    
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

                    <button
                        type="submit"
                        className="bg-blue-800 text-white rounded-md px-4 py-2 hover:bg-blue-600 block mx-auto"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
