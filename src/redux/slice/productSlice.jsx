import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productAPI } from "../../api/products";

export const createProduct = createAsyncThunk(
  "product/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await productAPI.create(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/update",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await productAPI.update(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllProduct = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await productAPI.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductBySlug = createAsyncThunk(
  "product/productBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await productAPI.getBySlug(slug);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
//
const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});
export default productSlice.reducer;
