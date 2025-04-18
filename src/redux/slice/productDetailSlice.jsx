import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productDetailAPI } from "../../api/productDetail";

export const createProductDetail = createAsyncThunk(
  "product-detail/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await productDetailAPI.create(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneProductDetail = createAsyncThunk(
  "product-detail/getOne",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await productDetailAPI.getOne(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneProductDetailBySeries = createAsyncThunk(
  "product-detail-by-series/getOne",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await productDetailAPI.getBySeries(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductDetailByProduct = createAsyncThunk(
  "product-detail/getByProduct",
  async (id_product, { rejectWithValue }) => {
    try {
      const { data } = await productDetailAPI.getByProduct(id_product);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchProductDetail = createAsyncThunk(
  "product-detail/search",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await productDetailAPI.search(query);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
