import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

// --- Async Thunks (for API calls) ---

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('user', JSON.stringify(response.data)); // Save user to local storage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(name, email, password);
      localStorage.setItem('user', JSON.stringify(response.data)); // Auto-login after sign up
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Get user from local storage (if they are already logged in) ---
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isAuthenticated: user ? true : false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // --- Standard Reducers ---
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user'); // Remove from local storage
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  // --- Extra Reducers (for async thunks) ---
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // This is the error message
      })
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;