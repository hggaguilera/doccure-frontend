import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "/doctors",
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "Doctor", id })), "Doctor"] : ["Doctor"],
    }),
    getDoctorsBasicInfo: builder.query({
      query: () => "/doctors/simplified",
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "Doctor", id })), "Doctor"] : ["Doctor"],
    }),
  }),
});

export const { useGetDoctorsQuery, useGetDoctorsBasicInfoQuery } = doctorApi;
