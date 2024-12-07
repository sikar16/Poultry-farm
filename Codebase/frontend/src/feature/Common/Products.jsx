import React from 'react';
import chikcs from '../../assets/download.jpeg'
const products = [
    {
        id: 1,
        name: 'Brown Eggs',
        image: { chikcs },
        description: 'All Natural Italian Style Chicken Broiler',
    },
    {
        id: 2,
        name: 'Little Chicks',
        image: { chikcs },
        description: 'Little Chicken Broiler Style Chicken',
    },
    {
        id: 3,
        name: 'Fresh Chicken',
        image: { chikcs },
        description: 'All Natural Italian Style Chicken',
    },
    {
        id: 4,
        name: 'White Eggs',
        image: { chikcs },
        description: 'All Natural White Chicken Eggs',
    },
];

function ProductCard({ product }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <img src={chikcs} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-green-600">{product.price}</span>

            </div>
        </div>
    );
}

function Products() {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Our Farm Products</h1>
            <p className="text-lg text-center text-gray-700 mb-6">
                Conveniently customize proactive web services for leveraged interfaces without globally diminished product set.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;