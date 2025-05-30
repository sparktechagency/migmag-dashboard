import { baseApi } from "../../features/baseApi";

const heroApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    heroPostApi: builder.mutation({
      query: (data) => ({
        url: "/create-banner",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useHeroPostApiMutation } = heroApiSlice;
