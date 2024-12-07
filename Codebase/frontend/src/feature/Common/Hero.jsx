import React from 'react';
import { Link } from 'react-router-dom';
import hero from "../../assets/download.jpeg"

function Hero() {
    return (
        <div className="relative bg-green-900 text-white h-screen flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0">
                <img
                    src={hero} // Replace with your image URL
                    alt="Poultry Farm Management"
                    className="object-cover w-full h-full opacity-50"
                />
            </div>
            <div className="relative z-10 p-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Streamline Your Poultry Management
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Innovative software solutions for efficient poultry farming.
                </p>
                <Link to="/features" className="bg-[#FF7D00] text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300">
                    Explore Features
                </Link>
            </div>
        </div>
    );
}

export default Hero;