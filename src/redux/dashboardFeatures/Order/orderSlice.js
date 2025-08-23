import { baseApi } from "../../features/baseApi";

const orderSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderGet: builder.query({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params, 
      }),
    }),
    orderDetails: builder.query({
      query: (id) => ({
        url: `/order-details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useOrderGetQuery, useOrderDetailsQuery } = orderSlice;
