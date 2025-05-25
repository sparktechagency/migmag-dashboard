import { baseApi } from "../../features/baseApi";

const manageUserSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query({
      query: ({ search }) => ({
        url: `/users`,
        params: { search },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useSearchUserQuery } = manageUserSlice;
