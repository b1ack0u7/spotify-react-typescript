import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { audioSlice } from "./slices/audioSlice";

export const store = configureStore({
  reducer: {
    audioReducer: audioSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>