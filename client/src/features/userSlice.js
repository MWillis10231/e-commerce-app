import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // Signing in and signing out 
  reducers: {
    signOut(state, action) {
      state.data = {};
      state.loggedIn = false;
    },
    signIn(state, action) {
        state.data = action.payload;
        state.loggedIn = true;
    },
  },
});

export const { signOut, signIn } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.data;
export const selectLoggedIn = (state) => state.user.loggedIn;