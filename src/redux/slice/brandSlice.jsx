import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { brandAPI } from "../../api/brand";
export const getAllBrands = createAsyncThunk(
  "brand/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await brandAPI.getAll()
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createBrand = createAsyncThunk(
  "brand/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await brandAPI.create(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBrand= createAsyncThunk(
  "brand/update",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await brandAPI.update(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
////
const initialState = {
  brands: [],
};

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder
      .addCase(getAllBrands.fulfilled, (state, { payload }) => {
        state.brands = payload;
      })
  },
});

export default brandSlice.reducer;
