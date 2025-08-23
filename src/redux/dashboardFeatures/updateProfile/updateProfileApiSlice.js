import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updateProfileApi = createApi({
  reducerPath: "updateProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://103.186.20.110:8002/api`, // no hardcoded base URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin_token"); // get token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/update-profile",
        method: "POST",
        body: formData,
        
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = updateProfileApi;
