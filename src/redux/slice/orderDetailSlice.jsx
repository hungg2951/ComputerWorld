import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderDetailAPI } from "../../api/order";
export const getAllOrderDetails = createAsyncThunk(
  "orderDetails/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await OrderDetailAPI.getAll()
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createOrderDetail = createAsyncThunk(
  "orderDetail/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await OrderDetailAPI.create(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderDetail= createAsyncThunk(
  "orderDetail/update",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await OrderDetailAPI.update(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
////
const initialState = {
    orderDetails: [],
};

export const orderDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder
      .addCase(getAllOrderDetails.fulfilled, (state, { payload }) => {
        state.orderDetails = payload;
      })
  },
});

export default orderDetails.reducer;
