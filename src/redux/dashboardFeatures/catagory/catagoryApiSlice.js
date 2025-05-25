import { baseApi } from "../../features/baseApi";

const catagoryApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    genrePost: builder.mutation({
      query: (data) => {
        return {
          url: "/create-genre",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["catagory"],
    }),
    genreGet: builder.query({
      query: () => {
        return {
          url: "/genre",
          method: "GET",
        };
      },
      providesTags: ["catagory"],
    }),
    genreDelete: builder.mutation({
      query: (id) => ({
        url: `/delete-genre/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["catagory"],
    }),
  }),
});

export const {
  useGenrePostMutation,
  useGenreGetQuery,
  useGenreDeleteMutation,
} = catagoryApiSlice;
