import { configureStore } from "@reduxjs/toolkit";
import laptopTypeSlice from "./slice/laptopTypeSlice";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/userSlice";
import loadingSlice from "./slice/loadingSlice";
import brandSlice from "./slice/loadingSlice";

export const store = configureStore({
  reducer: {
    laptopType: laptopTypeSlice,
    auth: authSlice,
    userReducer: userSlice,
    loading: loadingSlice,
    brand:brandSlice

  },
});
