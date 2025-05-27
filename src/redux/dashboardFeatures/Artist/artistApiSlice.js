import { baseApi } from "../../features/baseApi";

const artistApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    artistGet: builder.query({
      query: ({ search }) => ({
        url: `/artist`,
        params: { search },
      }),
      providesTags: ["artist"],
    }),
    artistPost: builder.mutation({
      query: (formData) => ({
        url: `/create-artist`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["artist"],
    }),
  }),
});

export const { useArtistGetQuery, useArtistPostMutation } = artistApiSlice;
