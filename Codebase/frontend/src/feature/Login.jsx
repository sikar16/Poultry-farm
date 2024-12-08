import React, { useState } from 'react';
import { useLoginUserMutation } from '../service/loginApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginUserMutation();
    const { fetchData } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();


        const response = await login({ email, password }).unwrap();
        console.log('API Response:', response.data.token);
        if (response && response.data.token) {
            localStorage.setItem("token", JSON.stringify({ token: response.data.token }));
            fetchData();
            const role = response.data.data.admin.role;
            console.log('User Role:', role);
            if (role === 'SuperAdmin') {
                return navigate("/supAdmin/");
            }
            else if (role === 'admin') {
                return navigate("/admin");
            }
            if (role === 'farmWorker') {
                return navigate("/");
            }
            if (role === 'poultrySpecialist') {
                return navigate("/");
            }
        } else {
            console.error('Login failed: Invalid response structure');
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            placeholder="Your Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <a href="/register" className="text-green-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;