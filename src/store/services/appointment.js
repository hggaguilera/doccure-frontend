import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = Cookies.get("token");

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      if (token && (endpoint === "getAppointments" || endpoint === "getAppointmentById")) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    getAppointmentsDates: builder.query({
      query: () => ({ url: "/appointments/dates", headers: new Headers() }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Appointment", id })), "Appointment"]
          : ["Appointment"],
    }),
    getAppointmentById: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: (result, error, id) => [{ type: "Appointment", id }],
    }),
  }),
});

export const {
  useAddAppointmentMutation,
  useGetAppointmentsQuery,
  useGetAppointmentsDatesQuery,
  useGetAppointmentByIdQuery,
} = appointmentApi;
