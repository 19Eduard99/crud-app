import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `comments?postId=${postId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comments", id })),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
    }),
  }),
});

export const { useGetCommentsQuery } = commentsApi;
