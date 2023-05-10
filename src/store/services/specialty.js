import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = Cookies.get("token");

export const specialtyApi = createApi({
  reducerPath: "specialtyApi",
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
    getSpecialties: builder.query({
      query: () => "/specialties",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Specialty", id })), "Specialty"]
          : ["Specialty"],
    }),
    getSpecialtyById: builder.query({
      query: (id) => `/specialties/${id}`,
      providesTags: (result, error, id) => [{ type: "Specialty", id }],
    }),
    addSpecialty: builder.mutation({
      query: (body) => ({ url: "/specialties", method: "POST", body }),
      invalidatesTags: ["Specialty"],
    }),
    updateSpecialty: builder.mutation({
      query: ({ id, body }) => ({ url: `/specialties/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Specialty"],
    }),
  }),
});

export const {
  useGetSpecialtiesQuery,
  useGetSpecialtyByIdQuery,
  useAddSpecialtyMutation,
  useUpdateSpecialtyMutation,
} = specialtyApi;
