import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = Cookies.get("token");

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      let shouldHaveAuthorization;

      switch (endpoint) {
        case "getServices":
          shouldHaveAuthorization = true;
          break;
        case "getServiceById":
          shouldHaveAuthorization = true;
          break;
        case "addService":
          shouldHaveAuthorization = true;
          break;
        case "updateService":
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
    getServicesByCategory: builder.query({
      query: () => "/services/services-by-categories",
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "Service", id })), "Service"] : ["Service"],
    }),
    getServices: builder.query({
      query: () => "/services",
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "Service", id })), "Service"] : ["Service"],
    }),
    getServiceById: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: "Service", id }],
    }),
    addService: builder.mutation({
      query: (body) => ({ url: "/services", method: "POST", body }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ id, body }) => ({ url: `/services/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetServicesByCategoryQuery,
  useGetServiceByIdQuery,
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
