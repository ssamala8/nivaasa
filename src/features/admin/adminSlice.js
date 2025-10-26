// src/features/admin/adminSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminService from '../../services/adminService';

// --- Async Thunks (Defined ONCE) ---
export const fetchAdminData = createAsyncThunk(
  'admin/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      console.log("[adminSlice] STEP 1: fetchAdminData dispatched");
      const [statsRes, apartmentsRes, flatsRes, usersRes, paymentsRes, queriesRes] = await Promise.all([
        adminService.getAdminStats(),
        adminService.getApartments(),
        adminService.getFlats(),
        adminService.getUsers(),
        adminService.getMonthlyPayments(),
        adminService.getRecentQueries(),
      ]);
      const payload = {
        stats: statsRes.data,
        apartments: apartmentsRes.data,
        flats: flatsRes.data,
        users: usersRes.data,
        payments: paymentsRes.data,
        queries: queriesRes.data,
      };
      console.log("[adminSlice] STEP 2: fetchAdminData fulfilled with payload:", payload);
      if (!payload.stats) {
        console.error("[adminSlice] ERROR: Payload missing 'stats'");
        return rejectWithValue("Required 'stats' data missing");
      }
      return payload;
    } catch (error) {
      console.error("[adminSlice] STEP 2 (ERROR): fetchAdminData failed:", error);
      return rejectWithValue(error?.message || 'Unknown fetch error');
    }
  }
);

export const addFlat = createAsyncThunk('admin/addFlat', async (flatData, { rejectWithValue }) => {
  try { const response = await adminService.createFlat(flatData); return response.data; }
  catch (error) { return rejectWithValue(error.message); }
});

export const editFlat = createAsyncThunk('admin/editFlat', async ({ id, data }, { rejectWithValue }) => {
  try { const response = await adminService.updateFlat(id, data); return response.data; }
  catch (error) { return rejectWithValue(error.message); }
});

export const removeFlat = createAsyncThunk('admin/removeFlat', async (id, { rejectWithValue }) => {
  try { const response = await adminService.deleteFlat(id); return response.data.id; /* Return ID */ }
  catch (error) { return rejectWithValue(error.message); }
});

export const addUser = createAsyncThunk('admin/addUser', async (userData, { rejectWithValue }) => {
  try { const response = await adminService.createUser(userData); return response.data; }
  catch (error) { return rejectWithValue(error.message); }
});

export const editUser = createAsyncThunk('admin/editUser', async ({ id, data }, { rejectWithValue }) => {
  try { const response = await adminService.updateUser(id, data); return response.data; }
  catch (error) { return rejectWithValue(error.message); }
});

export const removeUser = createAsyncThunk('admin/removeUser', async (id, { rejectWithValue }) => {
  try { const response = await adminService.deleteUser(id); return response.data.id; /* Return ID */ }
  catch (error) { return rejectWithValue(error.message); }
});

export const assignBill = createAsyncThunk('admin/assignBill', async (data, { rejectWithValue, dispatch }) => {
    try {
        await adminService.assignMaintenanceBill(data);
        dispatch(fetchAdminData()); // Re-fetch data after assigning bill
        return true; // Indicate success
    } catch (error) { return rejectWithValue(error.message); }
});
// --- End Thunk Definitions ---


// --- Initial State ---
const initialState = {
  stats: null,
  apartments: [],
  flats: [],
  users: [],
  payments: [],
  queries: [],
  isLoading: false, // Start false
  isSubmitting: false,
  error: null,
};

// --- Slice Definition ---
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Initial Admin Data
      .addCase(fetchAdminData.pending, (state) => {
        console.log("[adminSlice] fetchAdminData.pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        console.log("[adminSlice] fetchAdminData.fulfilled");
        state.isLoading = false;
        if (action.payload) { // Check payload
            state.stats = action.payload.stats;
            state.apartments = action.payload.apartments;
            state.flats = action.payload.flats;
            state.users = action.payload.users;
            state.payments = action.payload.payments;
            state.queries = action.payload.queries;
            state.error = null;
        } else {
            console.error("[adminSlice] Fulfilled with invalid payload!", action.payload);
            state.error = "Invalid data received";
        }
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        console.log("[adminSlice] fetchAdminData.rejected");
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add Flat
      .addCase(addFlat.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(addFlat.fulfilled, (state, action) => { state.isSubmitting = false; state.flats.push(action.payload); })
      .addCase(addFlat.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload; })

      // Edit Flat
      .addCase(editFlat.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(editFlat.fulfilled, (state, action) => { state.isSubmitting = false; const index = state.flats.findIndex(f => f.id === action.payload.id); if (index !== -1) { state.flats[index] = action.payload; } })
      .addCase(editFlat.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload; })

      // Remove Flat
      .addCase(removeFlat.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(removeFlat.fulfilled, (state, action) => { state.isSubmitting = false; state.flats = state.flats.filter(f => f.id !== action.payload); })
      .addCase(removeFlat.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload; })

      // Add User
      .addCase(addUser.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(addUser.fulfilled, (state, action) => { state.isSubmitting = false; state.users.push(action.payload); })
      .addCase(addUser.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload; })

      // Edit User
      .addCase(editUser.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(editUser.fulfilled, (state, action) => { state.isSubmitting = false; const index = state.users.findIndex(u => u.id === action.payload.id); if (index !== -1) { state.users[index] = action.payload; } })
      .addCase(editUser.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload; })

      // Remove User
      .addCase(removeUser.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(removeUser.fulfilled, (state, action) => { state.isSubmitting = false; state.users = state.users.filter(u => u.id !== action.payload); })
      .addCase(removeUser.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload; })

      // Assign Bill
      .addCase(assignBill.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(assignBill.fulfilled, (state) => { state.isSubmitting = false; /* Data is re-fetched by fetchAdminData */ })
      .addCase(assignBill.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload; });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
