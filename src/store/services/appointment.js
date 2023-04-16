import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    addAppointment: builder.mutation({
      query: (body) => ({ url: "/appointment", method: "POST", body }),
      invalidatesTags: ["Post"],
    }),
    getAppointments: builder.query({ query: () => "/appointments" }),
  }),
});

export const { useAddAppointmentMutation, useGetAppointmentsQuery } = appointmentApi;
