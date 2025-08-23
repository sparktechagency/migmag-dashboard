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
      query: (data) => {
        return {
          url: "/create-artist",
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        };
      },
      invalidatesTags: ["artist"],
    }),
    artistDetete: builder.mutation({
      query: (id) => ({
        url: `/delete-artist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["artist"],
    }),
    // artistUpdate: builder.mutation({
    //   query: ({ id, artistInfo }) => ({
    //     url: `/update-artist/${id}`,
    //     method: "POST",
    //     body: artistInfo,
    //   }),
    //   invalidatesTags: ["artist"],
    // }),
  }),
});

export const {
  useArtistGetQuery,
  useArtistPostMutation,
  useArtistDeteteMutation,
  // useArtistUpdateMutation,
} = artistApiSlice;
