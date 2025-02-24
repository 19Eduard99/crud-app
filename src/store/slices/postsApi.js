import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Динамическое определение baseUrl в зависимости от окружения
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://jsonplaceholder.typicode.com"
    : "http://localhost:3001";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useEditPostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
} = postsApi;
