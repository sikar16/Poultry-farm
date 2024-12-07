import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="bg-green-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h2 className="text-lg font-bold mb-4">About Us</h2>
                        <p className="text-gray-300">
                            We are dedicated to providing the best service in the industry. Our team is committed to ensuring customer satisfaction and quality.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                        <ul className="text-gray-300">
                            <li><a href="/services" className="hover:underline">Our Services</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                            <li><a href="/faq" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-6 pt-4 text-center">
                    <p className="text-gray-400">
                        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;