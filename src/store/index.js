import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { doctorApi } from "../services/doctor";
import { appointmentApi } from "../services/appointment";

export const store = configureStore({
  reducer: {
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doctorApi.middleware, appointmentApi.middleware),
});

setupListeners(store.dispatch);
