import { baseApi } from "../../features/baseApi";

const authSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLoginInfo: builder.mutation({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["admin"],
    }),
    VerifyEmail: builder.mutation({
      query: (data) => {
        return {
          url: "/resend-otp",
          method: "POST",
          params: data,
        };
      },
      invalidatesTags: ["admin"],
    }),
    postOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/otp-verify",
          method: "POST",
          params: data,
        };
      },
    }),
    setNewPass: builder.mutation({
      query: (data) => {
        return {
          url: "/create-new-password",
          method: "POST",
          params: data,
        };
      },
    }),

    

  }),
});

export const {
  usePostLoginInfoMutation,
  useVerifyEmailMutation,
  usePostOtpMutation,
  useSetNewPassMutation,
} = authSlice;
