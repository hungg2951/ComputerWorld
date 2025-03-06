import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../api/auth";

export const authLogin = createAsyncThunk(
  "login",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login(value);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authRegister = createAsyncThunk(
  "register",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.register(value);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/////
const initialState = {
  accessToken: "",
  isLogged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      (state.token = null), localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.access_token;
      state.isLogged = true;
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.access_token)
      );
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
