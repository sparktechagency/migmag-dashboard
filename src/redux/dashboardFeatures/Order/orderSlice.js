import { baseApi } from "../../features/baseApi";

const orderSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderGet: builder.query({
      query: () => {
        return {
          url: "/order",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
  }),
});

export const { useOrderGetQuery } = orderSlice;
