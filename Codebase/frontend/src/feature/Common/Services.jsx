import React from 'react';
import { useGetAllServiceQuery } from '../../service/subscribeApi'; // Update the path accordingly
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Services = () => {
    const { data, error, isLoading } = useGetAllServiceQuery();
    const { userData } = useAuth();
    const navigate = useNavigate(); // Instantiate the navigate function

    // Sample demo data
    const demoData = {
        // status: "success",
        data: [
            {
                planType: "Broiler",
                description: "This plan is for broiler poultry management",
                price: 100,
                validityPeriod: "45",
                status: "Active",
                createdAt: "2024-12-07T04:00:58.106Z",
                id: "6753c87a2b0ec333b23c7aec"
            },
            {
                planType: "Hatchery",
                description: "This plan caters to poultry hatcheries, offering tools to track and manage incubation and hatching processes efficiently.",
                price: 150,
                validityPeriod: "60",
                status: "Active",
                createdAt: "2024-12-07T04:02:58.438Z",
                id: "6753c8f22b0ec333b23c7af2"
            },
            {
                planType: "Layer",
                description: "This plan focuses on farms specializing in layer chickens for egg production, with tools to track egg yields and manage layers' health.",
                price: 200,
                validityPeriod: "1 and 1/2 years",
                status: "Active",
                createdAt: "2024-12-07T04:03:11.980Z",
                id: "6753c8ff2b0ec333b23c7af6"
            },
            {
                planType: "Full Package",
                description: "Comprehensive plan covering all poultry types (Broiler, Hatchery, Layer) with advanced analytics and real-time monitoring tools.",
                price: 400,
                validityPeriod: "1 and 1/2 years",
                status: "Active",
                createdAt: "2024-12-07T04:03:30.380Z",
                id: "6753c9122b0ec333b23c7afa"
            },
        ]
    };

    // Use demo data if there's an error or loading issue
    const servicesData = isLoading || error ? demoData : data;

    if (isLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error.message}</div>;
    }

    const handleSubscribe = (plan) => {
        if (userData.token) {
            // Navigate to the addFarmData page and pass the subscription plan data
            navigate('/admin/addFarmData', { state: { selectedPlan: plan } });
        } else {
            navigate('/register');
        }
    };

    return (
        <>
            <p className="text-4xl font-bold text-center text-green-800 mb-8">Choose Your Service and Pay as You Go</p>

            <div id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-6 p-8">
                {servicesData.data.map((plan) => (
                    <div key={plan.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{plan.planType}</div>
                            <p className="text-gray-700 text-base">{plan.description}</p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="text-gray-900 font-bold text-2xl">{plan.price} ETB</span>
                            <p className="text-gray-600">Validity: {plan.validityPeriod} days</p>
                        </div>
                        <div className="px-6 py-4 mx-auto">
                            <button
                                onClick={() => handleSubscribe(plan)} // Pass the selected plan to handleSubscribe
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                            >
                                {userData ? 'Subscribe' : 'Register'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Services;