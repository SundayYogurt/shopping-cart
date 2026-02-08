import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pages/pagesReducer"
import productReducer from "./products/productReducer"
import cartReducer from "./carts/CartReducer";
const store = configureStore({
  reducer: {
    pages: pageReducer,
    products: productReducer,
    carts: cartReducer,
  },
  devTools: true,
});

export default store;