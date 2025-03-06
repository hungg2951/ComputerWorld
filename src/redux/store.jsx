import { configureStore } from "@reduxjs/toolkit";
import laptopTypeSlice from "./slice/laptopTypeSlice";
import authSlice from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    laptopType: laptopTypeSlice,
    auth: authSlice,
  },
});
