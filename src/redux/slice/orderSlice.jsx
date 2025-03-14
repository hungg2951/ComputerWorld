import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderAPI } from "../../api/order";
export const getAllOrders = createAsyncThunk(
  "orders/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await OrderAPI.getAll()
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createOrder = createAsyncThunk(
  "orders/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await OrderAPI.create(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOrderByMomo = createAsyncThunk(
  "orders/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await OrderAPI.createMomo(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrder= createAsyncThunk(
  "orders/update",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await OrderAPI.update(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const getOrderId= createAsyncThunk(
  "order/getOneByOrderId",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await OrderAPI.getOrderId(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
////
const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
      })
  },
});

export default orderSlice.reducer;
