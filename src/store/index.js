import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { doctorApi } from "../services/doctor";

export const store = configureStore({
  reducer: {
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(doctorApi.middleware),
});

setupListeners(store.dispatch);
