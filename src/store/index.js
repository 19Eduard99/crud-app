import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./slices/postsApi";
import { commentsApi } from "./slices/commentsApi";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },

  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware()
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware),
});
