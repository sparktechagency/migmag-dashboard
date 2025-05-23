import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://137.59.180.219:8008/api",
    prepareHeaders: (headers, { getState }) => {
      const adminToken = localStorage.getItem("admin_token");
      console.log(adminToken);
      if (adminToken) {
        headers.set("Authorization", `Bearer ${adminToken}`);
        headers.set("acceppt", "application/json");
      }
      return headers;
    },
  }),
  // refresh for this tag
  tagTypes: ["admin"],
  endpoints: () => ({}),
});

export const { useGetPostQuery } = baseApi;
