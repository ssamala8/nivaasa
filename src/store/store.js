// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import adminReducer from '../features/admin/adminSlice'; // Ensure this is imported

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    admin: adminReducer, // Ensure this is included
  },
  // Enable Redux DevTools (optional but recommended for debugging)
  devTools: process.env.NODE_ENV !== 'production',
});