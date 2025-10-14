import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`, // <- points to backend
    prepareHeaders: (headers) => {
      // headers.set("Accept", "application/json");
      // headers.set("Content-Type", "application/json");

      const adminToken = localStorage.getItem("admin_token");
      const forgetToken = localStorage.getItem("forgetToken");
      if (forgetToken) {
        headers.set("Authorization", `Bearer ${forgetToken}`);
      }
      if (adminToken) {
        headers.set("Authorization", `Bearer ${adminToken}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "admin",
    "catagory",
    "user",
    "artist",
    "song",
    "order",
    "Notifications",
  ],
  endpoints: () => ({}),
});
