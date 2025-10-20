import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

// --- Async Thunks (for API calls) ---
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      // UPDATED
      sessionStorage.setItem('user', JSON.stringify(response.data)); 
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
      // UPDATED
      sessionStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Get user from session storage ---
// UPDATED
const user = JSON.parse(sessionStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isAuthenticated: user ? true : false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // UPDATED
      sessionStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ... (extraReducers logic remains exactly the same)
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
        state.error = action.payload;
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