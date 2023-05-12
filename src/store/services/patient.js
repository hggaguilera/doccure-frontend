import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = Cookies.get("token");

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => "/patients",
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "Patient", id })), "Patient"] : ["Patient"],
    }),
    getPatientById: builder.query({
      query: (id) => `/patients/${id}`,
      providesTags: (result, error, id) => [{ type: "Patient", id }],
    }),
    addPatient: builder.mutation({
      query: (body) => ({ url: "/patients", method: "POST", body }),
      invalidatesTags: ["Patient"],
    }),
    updatePatient: builder.mutation({
      query: ({ id, body }) => ({ url: `/patients/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Patient"],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useAddPatientMutation,
  useUpdatePatientMutation,
} = patientApi;
