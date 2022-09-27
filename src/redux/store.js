import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user';
import { userTableReducer } from './slices/usersTable';

const store = configureStore({
  reducer: {
    user: userReducer,
    userTable: userTableReducer,
  },
});

export default store;
