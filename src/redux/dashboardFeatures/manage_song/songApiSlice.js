import { baseApi } from "../../features/baseApi";

const songApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewSong: builder.mutation({
      query: (data) => {
        return {
          url: "/create-song",
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        };
      },
      invalidatesTags: ["song"],
    }),
    updateSong: builder.mutation({
      query: ({ id, updateInfo }) => {
        return {
          url: `/update-song/${id}`,
          method: "POST",
          body: updateInfo,
        };
      },
      invalidatesTags: ["song"],
    }),
    getManageSong: builder.query({
      query: ({ params }) => ({
        url: `/publish-song`,
        params: params,
      }),
      providesTags: ["song"],
    }),
    manageSongDelete: builder.mutation({
      query: (id) => ({
        url: `/delete-song/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["song"],
    }),
    manageSongPublise: builder.mutation({
      query: ({ id, is_publise }) => ({
        url: `published/${id}?is_published=${is_publise}`,
        method: "PATCH",
      }),
      invalidatesTags: ["song"],
    }),
  }),
});

export const {
  useCreateNewSongMutation,
  useGetManageSongQuery,
  useManageSongDeleteMutation,
  useUpdateSongMutation,
  useManageSongPubliseMutation,
} = songApiSlice;
