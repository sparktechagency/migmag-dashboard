import { baseApi } from "../../features/baseApi";

const updateProfileApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = updateProfileApiSlice;
