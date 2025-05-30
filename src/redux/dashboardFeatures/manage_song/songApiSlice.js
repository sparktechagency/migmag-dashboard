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
    // updateSong: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: `/update-song/1?_method=PUT`,
    //       method: "PUT",
    //       body: data,
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     };
    //   },
    //   invalidatesTags: ["song"],
    // }),
    getManageSong: builder.query({
      query: ({ params }) => ({
        url: `/song`,
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
  }),
});

export const {
  useCreateNewSongMutation,
  useGetManageSongQuery,
  useManageSongDeleteMutation,
} = songApiSlice;
