import React from 'react';

const Card = ({ product }) => {
  const { image, title, price } = product;

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden max-w-xs m-4 border border-gray-100">
      {/* ส่วนรูปภาพ */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {/* Badge ตัวอย่าง */}
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Sale
        </span>
      </div>

      {/* ส่วนเนื้อหา */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{title}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-indigo-600">${price}</span>
          <span className="text-sm text-gray-400 line-through">${(price * 1.2).toFixed(2)}</span>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex justify-center items-center gap-2">
          {/* ใส่ Icon ถ้ามี */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;