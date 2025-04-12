import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { voucherAPI } from "../../api/voucher";

export const getAllVouchers = createAsyncThunk(
  "vouchers/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await voucherAPI.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const applyVoucher = createAsyncThunk(
  "vouchers/apply",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await voucherAPI.apply(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createVoucher = createAsyncThunk(
  "vouchers/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await voucherAPI.create(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVoucher = createAsyncThunk(
    "vouchers/update",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await voucherAPI.update(values);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const initialState = {
  vouchers: [],
};

export const voucherSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getAllVouchers.fulfilled, (state, { payload }) => {
      state.vouchers = payload;
    });
  },
});

export default voucherSlice.reducer;
