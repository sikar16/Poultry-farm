import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import hero from "../../assets/download.jpeg"
import Products from './Products';
import { useTranslation } from 'react-i18next';

function About() {
    const { t } = useTranslation();

    return (
        <>

            <div id="about" className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row bg-white rounded-lg shadow-lg">
                {/* Left Section - Image and Welcome Message */}
                <div className="flex p-6">
                    <div>
                        <h1 className="text-4xl font-bold text-green-800 mb-4">{t('welcomeTitle')}</h1>
                        <p className="text-lg text-gray-700 mb-4">
                            {t('welcomeDescription')}
                        </p>
                        <p className="text-lg text-gray-700 mb-6">
                            {t('headerSubtitle')}
                        </p>
                        <div className="bg-yellow-300 p-4 rounded-lg text-center text-lg font-bold">
                            42 <br />
                            {t('trustedByDescription')}
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
                    <h2 className="text-3xl font-semibold text-green-600 mb-4">{t('offeringsTitle')}</h2>
                    <ul className="list-disc list-inside space-y-4 mb-6">
                        <table>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            {t('offeringsItem1')}
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            {t('offeringsItem2')}
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            {t('offeringsItem3')}
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            {t('offeringsItem4')}
                        </li>
                    </ul>
                </div>
            </div>
            <Products />
        </>
    );
}

export default About;