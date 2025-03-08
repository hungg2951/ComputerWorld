import { configureStore } from "@reduxjs/toolkit";
import laptopTypeSlice from "./slice/laptopTypeSlice";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/userSlice";
import loadingSlice from "./slice/loadingSlice";
import brandSlice from "./slice/brandSlice";
import laptopSerisSlice from "./slice/laptopSerisSlice";
import productDetailSlice from "./slice/productDetailSlice";
import productsSlice from "./slice/productSlice";

export const store = configureStore({
  reducer: {
    laptopType: laptopTypeSlice,
    auth: authSlice,
    userReducer: userSlice,
    loading: loadingSlice,
    brand: brandSlice,
    laptopSeris: laptopSerisSlice,
    product: productsSlice,
    productDetail: productDetailSlice,
  },
});
