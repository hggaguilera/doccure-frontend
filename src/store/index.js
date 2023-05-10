import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth";
import {
  doctorApi,
  appointmentApi,
  serviceApi,
  patientApi,
  countryApi,
  specialtyApi,
} from "./services";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [specialtyApi.reducerPath]: specialtyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      doctorApi.middleware,
      appointmentApi.middleware,
      serviceApi.middleware,
      patientApi.middleware,
      countryApi.middleware,
      specialtyApi.middleware,
    ),
});

setupListeners(store.dispatch);
