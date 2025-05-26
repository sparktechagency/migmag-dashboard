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
    bannedPatch: builder.mutation({
      query: ({ id, is_banned }) => ({
        url: `/update-banned-status/${id}?is_banned=${is_banned}`,
        method: "PATCH",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useSearchUserQuery, useBannedPatchMutation } = manageUserSlice;
