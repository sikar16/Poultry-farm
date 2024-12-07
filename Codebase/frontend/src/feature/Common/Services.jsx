import React from 'react';

// Define service data with detailed descriptions
const services = [
    {
        id: 1,
        name: 'Hatchlings',
        description: 'Our hatchlings are sourced from the best breeds, ensuring high survival rates and robust growth. This service includes comprehensive support for raising your hatchlings successfully.',
        price: '2000 birr per Month',
        features: [
            'Healthy hatchlings from certified sources',
            'Veterinary care included for the first month',
            'Nutritional guidance to promote healthy growth',
            '24/7 customer support for any inquiries',
            'Regular health check-ups at discounted rates',
        ],
    },
    {
        id: 2,
        name: 'Layers',
        description: 'Our layers are specifically bred to maximize egg production while maintaining health and vitality. This service includes expert advice on feed management and care.',
        price: '5000 birr per Month',
        features: [
            'High egg production rates of up to 300 eggs/year',
            'Disease-resistant breeds to minimize health issues',
            'Expert feed management strategies provided',
            'Nutritional supplements included for enhanced performance',
            'Monthly check-ins with our poultry specialists',
        ],
    },
    {
        id: 3,
        name: 'Broilers',
        description: 'Our broiler service focuses on providing fast-growing chickens that yield high-quality meat. We offer guidance on feed efficiency and growth management to maximize your profits.',
        price: '7000 birr per Month',
        features: [
            'Fast growth rates, ready for market in as little as 6 weeks',
            'Quality meat production with high feed conversion efficiency',
            'Support for optimal housing and environmental conditions',
            'Health monitoring services included',
            'Access to market trends and pricing advice',
        ],
    },
    {
        id: 4,
        name: 'Egg Production',
        description: 'This service offers comprehensive support for maximizing egg production efficiency. We provide strategies to ensure quality and yield, along with market guidance.',
        price: '8000 birr per Month',
        features: [
            'Maximize yield with tailored production plans',
            'Quality assurance checks to maintain high standards',
            'Market guidance to help you position your products effectively',
            'Waste management strategies to minimize environmental impact',
            'Access to workshops on best practices in egg production',
        ],
    },
];

// Service Card Component
function ServiceCard({ service }) {
    const handleChoosePackage = () => {
        alert(`You have chosen the {service.name} package!`); // Replace with modal or routing later
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 text-center transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-bold text-green-800 mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <span className="text-xl font-bold text-green-600 mb-4 block">{service.price}</span>
            <ul className="text-left mb-4">
                {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-600 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>
            <button
                onClick={handleChoosePackage}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
                Choose Package
            </button>
        </div>
    );
}

// Services Component
function Services() {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Our Services</h1>
            <p className="text-lg text-center text-gray-700 mb-6">
                Explore our range of services designed to enhance your farming experience and productivity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
            <p className="text-center text-gray-500 mt-6">
                Contact us for more information or to customize a package that fits your needs!
            </p>
        </div>
    );
}

export default Services;