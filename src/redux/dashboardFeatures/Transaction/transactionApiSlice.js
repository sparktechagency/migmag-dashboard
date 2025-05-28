import { baseApi } from "../../features/baseApi";

const transactionApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        transactionGet: builder.query({
            query: (data) => {
                return {
                    url: "/transactions",
                    method: "GET",
                    body: data,
                };
            },
            providesTags: ["transaction"],
        }),
    }),
});

export const {useTransactionGetQuery } = transactionApiSlice;
