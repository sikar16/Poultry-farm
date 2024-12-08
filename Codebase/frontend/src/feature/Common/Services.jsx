import React from 'react';
import { useGetAllServiceQuery } from '../../service/subscribeApi'; // Update the path accordingly
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Services = () => {
    const { data, error, isLoading } = useGetAllServiceQuery();
    const { userData } = useAuth();
    const navigate = useNavigate(); // Instantiate the navigate function

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
                {data.data.map((plan) => (
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