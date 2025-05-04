import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./language/languageSlice.ts";
import authSlice from "./auth/authSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    language: languageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
