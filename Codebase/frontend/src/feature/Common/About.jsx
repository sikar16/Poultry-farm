import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import hero from "../../assets/download.jpeg"
import Products from './Products';

function About() {
    return (
        <>

            <div id="about" className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row bg-white rounded-lg shadow-lg">
                {/* Left Section - Image and Welcome Message */}
                <div className="flex p-6">
                    <div>
                        <h1 className="text-4xl font-bold text-green-800 mb-4">Welcome to Our doroSAAS!</h1>
                        <p className="text-lg text-gray-700 mb-4">
                            At  doroSAS, we are dedicated to revolutionizing the poultry farming industry through innovative software solutions.
                        </p>
                        <p className="text-lg text-gray-700 mb-6">
                            Our platform provides farmers with the tools they need to manage their operations efficiently and sustainably.
                        </p>
                        <div className="bg-yellow-300 p-4 rounded-lg text-center text-lg font-bold">
                            42 <br />
                            Trusted by  Farm Managers
                        </div>
                    </div>

                </div>

                <div className="flex-1">
                    <img
                        src={hero}
                        alt="Poultry Farm"
                        className="rounded-lg object-cover w-full h-full"
                    />
                </div>

                {/* Features Section */}
                <div className="mt-8 lg:mt-12 w-full">
                    <h2 className="text-3xl font-semibold text-green-600 mb-4">What We Offer</h2>
                    <ul className="list-disc list-inside space-y-4 mb-6">
                        <table>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            Poultry Management Software: Comprehensive tools for tracking bird health and production metrics.
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            Data Analytics: Insights and reports that help farmers make informed decisions based on real-time data.
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            Cloud-Based Solutions: Access your data from anywhere, ensuring you stay connected with your operations.
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            Customer Support: Our dedicated support team is here to assist you with any questions.
                        </li>
                    </ul>
                </div>
            </div>
            <Products />
        </>
    );
}

export default About;