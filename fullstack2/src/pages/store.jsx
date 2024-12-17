  // src/store.js
  import { configureStore } from '@reduxjs/toolkit';
  import userReducer from './userSlice';

  const store = configureStore({
    reducer: {
      user: userReducer
    },
    // Add Redux DevTools Extension for development purposes
    devTools: process.env.NODE_ENV !== 'production',
  });

  export default store;
