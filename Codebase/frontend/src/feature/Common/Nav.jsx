import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.pageYOffset > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`bg-green-900 text-white py-4 px-6 sm:px-8 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky
                ? 'lg:w-[96%] lg:mx-[2%] lg:rounded-[30px] py-3'
                : 'lg:w-full lg:mx-0 py-4'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className="bg-[#FF7D00] w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                    🐔
                </div>
                <span className="font-bold text-lg">Poultry Farm</span>
            </div>

            <nav className="hidden md:block">
                <ul className="flex gap-3">
                    <li className="relative group">
                        <Link
                            to="/"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="relative group">
                        <Link
                            to="/about"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            About Us
                        </Link>
                    </li>
                    <li className="relative group">
                        <Link
                            to="/services"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            Services
                        </Link>

                    </li>
                    <li className="relative group">
                        <Link
                            to="/contact"
                            className="px-4 py-2 rounded-3xl hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>

            <div>
                <Link to="/register" className="px-4 py-2 bg-[#FF7D00] text-white rounded-md hover:bg-orange-600 transition duration-300">
                    Register
                </Link>
            </div>

            <button onClick={toggleMobileMenu} className="md:hidden">
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {isMobileMenuOpen && (
                <div className="fixed top-16 left-0 right-0 bg-green-900 p-4 rounded-lg shadow-lg md:hidden z-50">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link
                                to="/"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="block px-4 py-2 rounded-md text-center hover:bg-[#FF7D00] hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Nav;