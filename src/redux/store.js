import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import topicSlice from './slices/topicSlice';
import commentSlice from './slices/commentSlice';
import profileSlice from './slices/profileSlice';
import adminSlice from './slices/adminSlice'; // Import the admin slice

const store = configureStore({
    reducer: {
      auth: authReducer,
      topic: topicSlice,
      comment: commentSlice,
      profile: profileSlice,
      admin: adminSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
  });  

export default store;