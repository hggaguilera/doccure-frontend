import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    addAppointment: builder.mutation({
      query: (body) => ({ url: "/appointments", method: "POST", body }),
      invalidatesTags: ["Appointment"],
    }),
    getAppointments: builder.query({
      query: () => "/appointments",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Appointment", id })), "Appointment"]
          : ["Appointment"],
    }),
  }),
});

export const { useAddAppointmentMutation, useGetAppointmentsQuery } = appointmentApi;
