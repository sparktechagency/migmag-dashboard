import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/baseApi";

export default configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
