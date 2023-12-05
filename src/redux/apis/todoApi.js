import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.211:1234/",
    timeout: 5000,
  }),
  endpoints: (builder) => ({
    getTodoById: builder.query({
      query: (name) => `lists/${name}`,
    }),
    getTodoList: builder.query({
      query: (queryString = "") => `lists${queryString}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.data.map(({ id }) => ({ type: "Todo", id })),
              { type: "Todo", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Todo", id: "LIST" }],
    }),
    addTodo: builder.mutation({
      query: ({ ...todo }) => ({
        url: "lists",
        method: "POST",
        body: todo,
      }),
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `lists/${id}`,
        method: "PATCH",
        body: todo,
      }),
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
  }),
});

export const { useGetTodoListQuery, useGetTodoByIdQuery, useAddTodoMutation } =
  todoApi;
