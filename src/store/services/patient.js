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
    }),
  }),
});

export const { useGetPatientsQuery } = patientApi;
