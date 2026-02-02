import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'; // 1. ต้อง import อันนี้
import { addProduct } from '../../redux/products/action';

const AddProductForm = () => {
  const dispatch = useDispatch();
  
  // 2. ดึง register และ handleSubmit มาใช้
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      category: '',
      image: '',
      price: '',
      quantity: '',
    }
  });

  // 3. ฟังก์ชันนี้จะทำงานเมื่อกด Submit และผ่าน Validation แล้ว
  const onSubmit = (data) => {
    const newProduct = {
      ...data,
      price: parseFloat(data.price), // แปลงเป็นตัวเลข
      quantity: parseInt(data.quantity), // แปลงเป็นจำนวนเต็ม
    };

    console.log('Dispatching:', newProduct);
    dispatch(addProduct(newProduct));
    reset(); // ล้างค่าในฟอร์ม
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
      
      {/* ใช้ handleSubmit ของ hook form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            id="title"
            // ใช้ {...register(...)} แทน value และ onChange
            {...register("title", { required: "Product title is required" })}
            className={`block w-full px-4 py-3 rounded-lg border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g., Wireless Headphones"
          />
          {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-500"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Kitchen</option>
            <option value="books">Books</option>
          </select>
          {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            id="image"
            {...register("image", { required: "Image URL is required" })}
            className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://example.com/image.jpg"
          />
           {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              id="price"
              step="0.01"
              {...register("price", { required: "Price is required", min: 0 })}
              className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="0.00"
            />
             {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              id="quantity"
              {...register("quantity", { required: "Quantity is required", min: 1 })}
              className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="0"
            />
             {errors.quantity && <span className="text-red-500 text-xs">{errors.quantity.message}</span>}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;