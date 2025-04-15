import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendmailAPI } from "../../api/sendmail";

export const sendmailOrder = createAsyncThunk(
  "sendmail/order",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await sendmailAPI.sendmailOrder(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  sendmail: [],
};

const sendmailSlice = createSlice({
  name: "sendmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default sendmailSlice.reducer;
