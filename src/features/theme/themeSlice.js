import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Action to toggle the theme
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

// Export the action creator
export const { toggleTheme } = themeSlice.actions;

// Export the reducer
export default themeSlice.reducer;