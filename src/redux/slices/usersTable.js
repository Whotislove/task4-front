import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  id: [],
};

const usersTableSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUsers(state, action) {
      state.users = action.payload;
    },
    addUserId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { addUsers, addUserId } = usersTableSlice.actions;

export const userTableReducer = usersTableSlice.reducer;
