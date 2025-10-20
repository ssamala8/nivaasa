import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardService from '../../services/dashboardService';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (userRole, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getDashboardData(userRole);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: null,
  isLoading: true, // Start in loading state
  error: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;