import { baseApi } from "../../features/baseApi";

const catagoryApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // genre
    genrePost: builder.mutation({
      query: (body) => {
        console.log("------------infoGenre-------", body);
        return {
          url: "/create-genre",
          method: "POST",
          body,
          headers: {
            Accept: "application/json",
          },
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
    // genre end
    // key
    keyPost: builder.mutation({
      query: (data) => {
        return {
          url: "/create-key",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["catagory"],
    }),
    keyGet: builder.query({
      query: () => {
        return {
          url: "/key",
          method: "GET",
        };
      },
      providesTags: ["catagory"],
    }),
    keyDelete: builder.mutation({
      query: (id) => ({
        url: `/delete-key/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["catagory"],
    }),
    // key end
    // licens
    licensePost: builder.mutation({
      query: (data) => {
        return {
          url: "/create-license",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["catagory"],
    }),
    licenseGet: builder.query({
      query: () => {
        return {
          url: "/license",
          method: "GET",
        };
      },
      providesTags: ["catagory"],
    }),
    licenseDelete: builder.mutation({
      query: (id) => ({
        url: `/delete-license/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["catagory"],
    }),
    // licens end
    // type
    typePost: builder.mutation({
      query: (data) => {
        return {
          url: "/create-type",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["catagory"],
    }),
    typeGet: builder.query({
      query: () => {
        return {
          url: "/type",
          method: "GET",
        };
      },
      providesTags: ["catagory"],
    }),
    typeDelete: builder.mutation({
      query: (id) => ({
        url: `/delete-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["catagory"],
    }),
    // type end
  }),
});

export const {
  useGenrePostMutation,
  useGenreGetQuery,
  useGenreDeleteMutation,

  useKeyPostMutation,
  useKeyGetQuery,
  useKeyDeleteMutation,

  useLicenseDeleteMutation,
  useLicenseGetQuery,
  useLicensePostMutation,

  useTypeDeleteMutation,
  useTypePostMutation,
  useTypeGetQuery,
} = catagoryApiSlice;
