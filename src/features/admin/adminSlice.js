import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminService from '../../services/adminService';

// Async thunks
export const fetchAdminData = createAsyncThunk(
  'admin/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch all data in parallel
      const [statsRes, apartmentsRes, flatsRes] = await Promise.all([
        adminService.getAdminStats(),
        adminService.getApartments(),
        adminService.getFlats(),
      ]);
      return {
        stats: statsRes.data,
        apartments: apartmentsRes.data,
        flats: flatsRes.data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  stats: null,
  apartments: [],
  flats: [],
  isLoading: true,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.stats;
        state.apartments = action.payload.apartments;
        state.flats = action.payload.flats;
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;