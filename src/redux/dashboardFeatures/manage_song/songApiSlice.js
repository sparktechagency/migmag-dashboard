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
    getManageSong: builder.query({
      query: ({ params }) => ({
        url: `/song`,
        params: params,
      }),
      providesTags: ["song"],
    }),
  }),
});

export const { useCreateNewSongMutation, useGetManageSongQuery } = songApiSlice;
