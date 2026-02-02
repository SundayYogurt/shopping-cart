import { ADD_PRODUCTS, REMOVE_QUANTITY, ADD_QUANTITY } from "./actionTypes";
import { initialState } from "./initialState";

const nextId = (Items) => {
    return Items.reduce((id, item) => Math.max(id, item.id), -1) + 1;
}
const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PRODUCTS: return [...state, {id:nextId(state), ...action.payload, price:parseFloat(action.payload.price), queantity:parseInt(action.payload.quantity)}]
        case ADD_QUANTITY: return state.map((product)=>{
            if(product.id === action.payload.productId){
                return {...product, quantity: product.quantity + action.payload.quantity}
            } else {
                return product
            }
        })
        case REMOVE_QUANTITY: return state.map((product)=>{
            if(product.id === action.payload.productId){
                return {...product, quantity: Math.max(product.quantity -1, action.payload.quantity)}
            } else {
                return product
            }
        })
        default: return state
    
    }
}

export default productsReducer;