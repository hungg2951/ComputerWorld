import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../../api/users";

export const userGetAll = createAsyncThunk(
  "user/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userUpdate = createAsyncThunk(
  "user/update",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.update(values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/////
const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userGetAll.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
