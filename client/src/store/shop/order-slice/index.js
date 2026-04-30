import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/shop/orders/create`,
        formData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "Failed to place order.",
        },
      );
    }
  },
);

export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/orders/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "Failed to fetch orders.",
        },
      );
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to place order.";
      })
      .addCase(fetchAdminOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload?.data || [];
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = [];
        state.error = action.payload?.message || "Failed to fetch orders.";
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
