import { baseApi } from "../../features/baseApi";

const songApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new song
    createNewSong: builder.mutation({
      query: (formData) => ({
        url: "/create-song",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["song"],
    }),

    // Get all published songs
    getManageSong: builder.query({
      query: ({ params }) => ({
        url: `/publish-song`,
        params: params,
      }),
      providesTags: ["song"],
    }),

    // Delete a song
    manageSongDelete: builder.mutation({
      query: (id) => ({
        url: `/delete-song/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["song"],
    }),

    // Manage the publish status of a song
    manageSongPublise: builder.mutation({
      query: ({ id, is_published }) => ({
        url: `published/${id}?is_published=${is_published}`,
        method: "PATCH",
      }),
      invalidatesTags: ["song"],
    }),

    // Get song details by ID
    songDetails: builder.query({
      query: (songUpdateId) => ({
        url: `/song-details/${songUpdateId}`,
        method: "GET",
      }),
      invalidatesTags: ["song"],
    }),
    songUpdate: builder.mutation({
      query: (id, updateInfo) => ({
        url: `/update-song/${id}?_method=PUT`,
        method: "POST",
        body: updateInfo,
      }),
      invalidatesTags: ["song"],
    }),
    selectTopSong: builder.mutation({
      query: (id) => ({
        url: `/top-song/${id}?_method=PUT`,
        method: "POST",
      }),
      invalidatesTags: ["song"],
    }),
  }),
});

export const {
  useCreateNewSongMutation,
  useGetManageSongQuery,
  useManageSongDeleteMutation,
  useManageSongPubliseMutation,
  useSongDetailsQuery,
  useSongUpdateMutation,
  useSelectTopSongMutation,
} = songApiSlice;

export default songApiSlice;
