import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updateProfileApi = createApi({
  reducerPath: "updateProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile", "Artist"], // define tags
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/update-profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"], // invalidate profile cache after update
    }),
    artistUpdate: builder.mutation({
      query: ({ id, artistInfo }) => ({
        url: `/update-artist/${id}`,
        method: "POST",
        body: artistInfo,
      }),
      invalidatesTags: ["Artist"], // invalidate artist cache after update
    }),
    userProfile: builder.query({
      query: () => "/profile", // ✅ must be wrapped in function
      providesTags: ["Profile"], // cache profile response
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useArtistUpdateMutation,
  useUserProfileQuery,
} = updateProfileApi;
