import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { laptopTypeAPI } from "../../api/laptopTypeAPI";

export const getAllData = createAsyncThunk(
  "laptopType/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await laptopTypeAPI.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  laptopType: [],
  isFetching: false,
  isSucess: false,
  isError: false,
};

export const laptopTypeSlice = createSlice({
  name: "laptopType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getAllData.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAllData.fulfilled, (state, { payload }) => {
      state.laptopType = payload;
      state.isFetching = false;
    });
    builder.addCase(getAllData.rejected, (state, { payload }) => {
      state.isFetching = false;
    });
  },
});

export default laptopTypeSlice.reducer;
