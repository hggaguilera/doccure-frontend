import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    const decoded = jwtDecode(result.token);

    Cookies.set("token", result.token);
    Cookies.set("tokenExpireTime", Date.now() + 1800 * 100);

    return { name: decoded.name, email: decoded.username };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error || action.payload || "Failed to Login";
      });
  },
});

export default authSlice.reducer;
