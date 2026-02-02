import React from 'react';
import Card from '../components/cards/Card';
import AddProductForm from '../components/forms/AddProductForm';
import { useSelector } from 'react-redux';
export const Home = () => {

const products = useSelector((state) => state.products);
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ShoppingCart</h1>

      {/* Flex บนจอใหญ่ (lg), Column บนจอมือถือ */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Side: Products */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-4">
          <AddProductForm />
        </div>

      </div>
    </div>
  );
};