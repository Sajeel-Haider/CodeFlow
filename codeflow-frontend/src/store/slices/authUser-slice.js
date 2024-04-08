import { createSlice } from "@reduxjs/toolkit";

export const authUserSlice = createSlice({
  name: "authUser",
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
