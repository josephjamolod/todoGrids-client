import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  currentUser: null,
  dark: false,
  toggle: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUserStart: (state, action) => {
      state.loading = action.payload;
      state.error = false;
    },
    signInUserSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signInUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state, action) => {
      state.loading = action.payload;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    checkUser: (state) => {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.currentUser = initialState.currentUser;
    },
    toggle: (state, action) => {
      state.toggle = action.payload;
    },
    toggleDark: (state, action) => {
      state.dark = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {
  signInUserStart,
  signInUserSuccess,
  signInUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  checkUser,
  toggle,
  toggleDark,
} = userSlice.actions;
