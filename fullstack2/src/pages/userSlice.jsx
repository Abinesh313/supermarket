// src/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    email: localStorage.getItem('userEmail') || '',
    accessToken: localStorage.getItem('accessToken') || ''
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('userEmail', action.payload.email);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = '';
      state.accessToken = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userEmail');
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
