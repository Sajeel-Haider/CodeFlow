import { createSlice } from "@reduxjs/toolkit";

export const authUserSlice = createSlice({
  name: "authUser",
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => {
      return action.payload;
    },
    clearAuthUser(state) {
      state.user = null;
    },
  },
});

export const { setAuthUser, clearAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
