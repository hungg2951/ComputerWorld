import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productDetailAPI } from "../../api/productDetail";

export const createProductDetail = createAsyncThunk(
  "product-detail/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await productDetailAPI.create(values);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
export const updateProductDetail = createAsyncThunk(
  "product-detail/update",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await productDetailAPI.update(values);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
export const getAllProductDetail = createAsyncThunk(
  "product-detail/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await productDetailAPI.getAll();
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
//
const initialState = {
  products_detail: [],
};

const productDetailSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductDetail.fulfilled, (state, action) => {
      state.products_detail = action.payload;
    });
  },
});
export default productDetailSlice.reducer;
