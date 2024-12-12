import React from 'react';
import chicks from '../../assets/download.jpeg';
import egg from '../../assets/eggs.jpeg';
import meat from '../../assets/meat.jpeg';
import hen from '../../assets/h2.jpg';
import { useTranslation } from 'react-i18next';

const products = [
    {
        id: 1,
        name: 'Brown Eggs',
        image: chicks,
        description: 'All Natural Italian Style Chicken Broiler',
        price: '15 ETB', // Added price
    },
    {
        id: 2,
        name: 'Little Chicks',
        image: egg,
        description: 'Little Chicken Broiler Style Chicken',
        price: '800 ETB', // Added price
    },
    {
        id: 3,
        name: 'Fresh Chicken',
        image: meat,
        description: 'All Natural Italian Style Chicken',
        price: '800 ETH', // Added price
    },
    {
        id: 4,
        name: 'White Eggs',
        image: hen,
        description: 'All Natural White Chicken Eggs',
        price: '14 ETB', // Added price
    },
];

function ProductCard({ product }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-green-600">{product.price}</span>
            </div>
        </div>
    );
}

function Products() {
    const { t } = useTranslation();
    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-center text-green-800 mb-8">{t('productsTitle')}</h1>
            <p className="text-lg text-center text-gray-700 mb-6">
                {t('productsDescription')}
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