import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updateProfileApi = createApi({
  reducerPath: "updateProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`, // no hardcoded base URL
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
    artistUpdate: builder.mutation({
      query: ({ id, artistInfo }) => ({
        url: `/update-artist/${id}`,
        method: "POST",
        body: artistInfo,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useArtistUpdateMutation } =
  updateProfileApi;
