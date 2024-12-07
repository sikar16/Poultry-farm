import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
function Contact() {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Thank you for your message! We will get back to you soon.'); // Placeholder for form submission logic
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Contact Us</h1>
            <p className="text-lg text-center text-gray-700 mb-6">
                We would love to hear from you! Please fill out the form below or reach us at our contact details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Get in Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                placeholder="Your Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows="4"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Contact Information</h2>
                    <p className="mb-2">
                        <strong>Email:</strong> poultry@gmail.com
                    </p>
                    <p className="mb-2">
                        <strong>Phone:</strong> +251 968 991 888
                    </p>
                    <p className="mb-2">
                        <strong>Address:</strong> Addis ababa, Ethiopai
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="flex items-center text-green-600 hover:text-green-800">
                            <FontAwesomeIcon icon={faFacebook} className="mr-2" />

                        </a>
                        <a href="#" className="flex items-center text-green-600 hover:text-green-800">
                            <FontAwesomeIcon icon={faTwitter} className="mr-2" />

                        </a>
                        <a href="#" className="flex items-center text-green-600 hover:text-green-800">
                            <FontAwesomeIcon icon={faInstagram} className="mr-2" />

                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;