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
    allNotification: builder.query({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
    notificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications-read/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),
    allNotificationRead: builder.mutation({
      query: () => ({
        url: `/notifications-read-all`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useOrderGetQuery,
  useOrderDetailsQuery,
  useAllNotificationQuery,
  useNotificationReadMutation,
  useAllNotificationReadMutation,
} = orderSlice;
