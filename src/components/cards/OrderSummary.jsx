import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  // 1. ดึงข้อมูลสินค้าในตะกร้าจาก Redux (ใช้ชื่อ carts ตาม store ของคุณ)
  const carts = useSelector((state) => state.carts);

  // 2. คำนวณยอดรวมราคาสินค้า (Subtotal)
  // วนลูปสินค้าทุกชิ้นเอา (ราคา x จำนวน) แล้วบวกรวมกัน
  const subtotal = carts.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 3. คำนวณจำนวนชิ้นทั้งหมด (Total Items)
  const totalItems = carts.reduce((sum, item) => sum + item.quantity, 0);

  // 4. กำหนดค่าส่ง (ตาม UI คือ 5.00)
  const shipping = 5.00;

  // 5. คำนวณราคาสุทธิ (Total Cost)
  // ถ้าไม่มีของในตะกร้า (subtotal เป็น 0) ให้ยอดรวมเป็น 0 (ไม่ต้องเสียค่าส่ง)
  const totalCost = subtotal > 0 ? subtotal + shipping : 0;

  return (
    <div id="summary" className="w-1/4 px-8 py-10 bg-gray-100">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      
      <div className="flex justify-between mt-10 mb-5">
        {/* แสดงจำนวนชิ้นรวม */}
        <span className="font-semibold text-sm uppercase">Items {totalItems}</span>
        {/* แสดง Subtotal */}
        <span className="font-semibold text-sm">฿{subtotal.toFixed(2)}</span>
      </div>

      <div className="py-10">
        <label className="font-semibold inline-block mb-3 text-sm uppercase">Shipping</label>
        <select className="block p-2 text-gray-600 w-full text-sm">
          <option>Standard delivery - ฿{shipping.toFixed(2)}</option>
        </select>
      </div>

      <div className="py-10">
        <label className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
        <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
      </div>
      
      <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
      
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          {/* แสดงราคาสุทธิ (รวมค่าส่ง) */}
          <span>฿{totalCost.toFixed(2)}</span>
        </div>
        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;