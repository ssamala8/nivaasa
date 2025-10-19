import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    // Add reducers from your features here
    theme: themeReducer,
  },
});