import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity 
} from '../../redux/carts/action'; 
// Import Action ฝั่ง Product มาด้วยเพื่อตัด/คืน Stock
import { addQuantity, removeQuantity } from '../../redux/products/action';

const CartItems = ({ product }) => {
  const dispatch = useDispatch();

  // 1. ดึงข้อมูลสินค้าทั้งหมดจาก Store เพื่อเช็ค Stock ล่าสุด
  const productsList = useSelector((state) => state.products);
  
  // แกะค่าจาก props (quantity ตรงนี้คือ จำนวนที่อยู่ในตะกร้า)
  const { id, title, image, category, price, quantity: cartQuantity, available } = product;

  // 2. หาว่าสินค้านี้ เหลือ Stock ในร้านเท่าไหร่?
  // (ต้องหาจาก productsList เพราะค่า quantity ใน props คือของในตะกร้า ไม่ใช่ของในร้าน)
  const originalProduct = productsList.find((p) => p.id === id);
  const currentStock = originalProduct ? originalProduct.quantity : 0;

  // ---------------------------------------------

  const handleDecreaseQuantity = () => {
      // ถ้ามีมากกว่า 1 ชิ้น -> ลดจำนวนในตะกร้า และ คืน Stock
      if (cartQuantity > 1) {
          dispatch(decreaseQuantity(id)); // ลดในตะกร้า 1
          dispatch(addQuantity(id, 1));   // ✅ คืน Stock ร้านค้า 1
      }
      // หมายเหตุ: ถ้าเหลือ 1 แล้วกดลบ ปกติ UX จะไม่ทำอะไร หรือต้องกดปุ่ม Remove แทน
  };

  const handleIncreaseQuantity = () => {
      // 3. เช็คก่อนว่ามีของใน Stock ไหม?
      if (currentStock > 0) {
          dispatch(increaseQuantity(id)); // เพิ่มในตะกร้า 1
          dispatch(removeQuantity(id));   // ✅ ตัด Stock ร้านค้า 1
      } else {
          alert("สินค้าหมดสต็อกแล้วครับ"); // แจ้งเตือน (Optional)
      }
  };

  const handleRemoveItem = () => {
      // 4. เมื่อกด Remove ต้องคืนของ "ทั้งหมด" ในตะกร้ากลับไปที่ Stock
      dispatch(removeFromCart(id));          // ลบจากตะกร้า
      dispatch(addQuantity(id, cartQuantity)); // ✅ คืน Stock ตามจำนวนที่หยิบมาทั้งหมด
  };

  // ---------------------------------------------

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      {/* 1. รูปและรายละเอียด */}
      <div className="flex w-2/5">
        <div className="w-20">
          <img className="h-24 object-cover" src={image} alt={title} />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{title}</span>
          <span className="text-red-500 text-xs">{category}</span>
          
          {/* แสดงสถานะ Stock */}
          {currentStock === 0 && <span className="text-red-500 text-xs font-bold">Out of Stock</span>}
          {currentStock > 0 && <span className="text-gray-400 text-xs">Available: {currentStock}</span>}
          
          <button 
            onClick={handleRemoveItem} // เปลี่ยนมาใช้ฟังก์ชันที่สร้างใหม่
            className="btn btn-sm btn-ghost font-semibold hover:text-red-500 text-gray-500 text-xs text-left"
          >
            Remove
          </button>
        </div>
      </div>

      {/* 2. ปุ่มเพิ่ม/ลด จำนวน */}
      <div className="flex justify-center w-1/5">
        
        {/* ปุ่มลดจำนวน */}
        <button 
            className={`text-gray-600 ${cartQuantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleDecreaseQuantity}
            disabled={cartQuantity <= 1} 
        >
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
          </svg>
        </button>

        <input 
          className="mx-2 border text-center w-8 text-gray-700" 
          type="text" 
          value={cartQuantity} 
          readOnly 
        />

        {/* ปุ่มเพิ่มจำนวน */}
        <button 
            className={`text-gray-600 ${currentStock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
            onClick={handleIncreaseQuantity}
            disabled={currentStock === 0} // ปิดปุ่มบวก ถ้า Stock หมด
        >
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
          </svg>
        </button>
      </div>

      <span className="text-center w-1/5 font-semibold text-sm">฿{price.toFixed(2)}</span>
      <span className="text-center w-1/5 font-semibold text-sm">฿{(price * cartQuantity).toFixed(2)}</span>
    </div>
  );
};

export default CartItems;