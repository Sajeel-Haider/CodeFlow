import { configureStore } from "@reduxjs/toolkit";

import authUserSlice from "./slices/authUser-slice";

const store = configureStore({
  reducer: {
    user: authUserSlice,
  },
});

export default store;
