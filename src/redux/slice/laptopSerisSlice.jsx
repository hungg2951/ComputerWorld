import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { laptopSerisAPI } from "../../api/laptopSeris";
export const laptopSerisGetAll = createAsyncThunk(
  "laptopSeris/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await laptopSerisAPI.getAll()
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createLaptopSeris = createAsyncThunk(
  "laptopSeris/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await laptopSerisAPI.create(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLaptopSeris= createAsyncThunk(
  "laptopSeris/update",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await laptopSerisAPI.update(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
////
const initialState = {
  laptopSeris: [],
};

export const laptopSerisSlice = createSlice({
  name: "laptopSeris",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder
      .addCase(laptopSerisGetAll.fulfilled, (state, { payload }) => {
        state.laptopType = payload;
      })
  },
});

export default laptopSerisSlice.reducer;
