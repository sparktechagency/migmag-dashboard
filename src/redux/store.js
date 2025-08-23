import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/baseApi";
import { updateProfileApi } from "./dashboardFeatures/updateProfile/updateProfileApiSlice";

export default configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [updateProfileApi.reducerPath]: updateProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      updateProfileApi.middleware
    ),
});
