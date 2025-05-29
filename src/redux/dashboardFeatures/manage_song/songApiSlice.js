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
      invalidatesTags: ["song"]
    }),
  }),
});

export const { useCreateNewSongMutation } = songApiSlice;
