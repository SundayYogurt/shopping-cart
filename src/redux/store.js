import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pages/pagesReducer"
import productReducer from "./products/productReducer"
const store = configureStore({
  reducer: {
    pages: pageReducer,
    products: productReducer,
  },
  devTools: true,
});

export default store;