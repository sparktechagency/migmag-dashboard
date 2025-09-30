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
    singleArtist: builder.query({
      query: (slug) => ({
        url: `/artist-detail/${slug}`,
        method: "GET",
      }),
    }),
    artistUpdate: builder.mutation({
      query: ({ artistId, formData }) => ({
        url: `/update-artist/${artistId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["artist"],
    }),
  }),
});

export const {
  useArtistGetQuery,
  useArtistPostMutation,
  useArtistDeteteMutation,
  useSingleArtistQuery,
  useArtistUpdateMutation,
} = artistApiSlice;
