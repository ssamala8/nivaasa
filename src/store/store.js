import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import adminReducer from '../features/admin/adminSlice'; // 1. Import

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    admin: adminReducer,
  },
});