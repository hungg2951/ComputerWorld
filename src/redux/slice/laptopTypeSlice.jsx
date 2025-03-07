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
export const createLaptopType = createAsyncThunk(
  "laptop-type/create",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await laptopTypeAPI.create(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLaptopType = createAsyncThunk(
  "laptop-type/update",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await laptopTypeAPI.update(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const getOneLaptopType = createAsyncThunk(
  "laptop-type/getOne",
  async (value, { rejectWithValue }) => {
    try {
      const {data} = await laptopTypeAPI.getById(value);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
////
const initialState = {
  laptopType: [],
  getOnelaptopType: {},
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
    builder
      .addCase(getAllData.fulfilled, (state, { payload }) => {
        state.laptopType = payload;
        state.isFetching = false;
      })
      .addCase(getOneLaptopType.fulfilled, (state, { payload }) => {
        state.getOnelaptopType = payload;
      });// có cần vieets cái này k nó bị ở đầu trên đầu này trả ra thôi
  },
});

export default laptopTypeSlice.reducer;
