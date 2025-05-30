import { baseApi } from "../../features/baseApi";

const deshboardApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deshboardGet: builder.query({
      query: () => ({
        url: "/dashboard",
      }),
    }),
  }),
});

export const { useDeshboardGetQuery } = deshboardApiSlice;
