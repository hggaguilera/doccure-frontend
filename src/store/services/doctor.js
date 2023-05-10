import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = Cookies.get("token");

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      let shouldHaveAuthorization;

      switch (endpoint) {
        case "getDoctors":
          shouldHaveAuthorization = true;
          break;
        case "getDoctorById":
          shouldHaveAuthorization = true;
          break;
        case "addDoctor":
          shouldHaveAuthorization = true;
          break;
        case "updateDoctor":
          shouldHaveAuthorization = true;
          break;
        default:
          shouldHaveAuthorization = false;
          break;
      }

      if (token && shouldHaveAuthorization) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    getDoctorById: builder.query({
      query: (id) => `/doctors/${id}`,
      providesTags: (result, error, id) => [{ type: "Doctor", id }],
    }),
    addDoctor: builder.mutation({
      query: (body) => ({ url: "/doctors", method: "POST", body }),
      invalidatesTags: ["Doctor"],
    }),
    updateDoctor: builder.mutation({
      query: ({ id, body }) => ({ url: `/doctors/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorsBasicInfoQuery,
  useGetDoctorByIdQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
} = doctorApi;
