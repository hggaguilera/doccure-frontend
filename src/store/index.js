import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth";
import { doctorApi } from "./services/doctor";
import { appointmentApi } from "./services/appointment";
import { serviceApi } from "./services/service";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      doctorApi.middleware,
      appointmentApi.middleware,
      serviceApi.middleware,
    ),
});

setupListeners(store.dispatch);
