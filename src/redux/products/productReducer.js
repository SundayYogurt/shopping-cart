import { ADD_PRODUCTS, REMOVE_QUANTITY, ADD_QUANTITY } from "./actionTypes";
import { initialState } from "./initialState";

const nextId = (Items) => {
    return Items.reduce((id, item) => Math.max(id, item.id), -1) + 1;
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case ADD_PRODUCTS: 
            return [
                ...state, 
                {
                    id: nextId(state), 
                    ...action.payload, 
                    price: parseFloat(action.payload.price), 
                    // 1. แก้คำผิด: จาก queantity เป็น quantity
                    quantity: parseInt(action.payload.quantity) 
                }
            ];

        case ADD_QUANTITY: 
            return state.map((product) => {
                // สมมติว่าส่งมาเป็น Object { productId, quantity }
                if(product.id === action.payload.productId){
                    return {...product, quantity: product.quantity + action.payload.quantity}
                }
                return product;
            });

        case REMOVE_QUANTITY: 
            return state.map((product) => {
                // 2. แก้ไข: เช็ค ID ตรงๆ เพราะจาก Card.jsx เราส่งมาแค่ id (เช่น 1, 2)
                if (product.id === action.payload) { 
                    return {
                        ...product, 
                        // 3. แก้ไข: ลบทีละ 1 และห้ามต่ำกว่า 0
                        quantity: Math.max(0, product.quantity - 1) 
                    };
                } 
                return product;
            });

        default: 
            return state;
    }
}

export default productsReducer;