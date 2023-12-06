import { api } from ".";

export const todoApi = api.injectEndpoints({
  endpoints: builder => ({
    getTodoById: builder.query({
      query: (name) => `lists/${name}`,
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
    getTodoList: builder.query({
      query: (queryString = "") => `lists${queryString}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Todo", id })),
              { type: "Todo", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Todo", id: "PARTIAL-LIST" }],
    }),
    addTodo: builder.mutation({
      query: ({ ...todo }) => ({
        url: "lists",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: [{ type: "Todo", id: "PARTIAL-LIST" }],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `lists/${id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Todo", id }],
    }),
    completeTodo: builder.mutation({
      query: (id) => ({
        url: `lists/${id}`,
        method: "PATCH",
        body: {
          completed: true,
          progress: 100,
        },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Todo", id },
        { type: "Todo", id: "PARTIAL-LIST" },
      ],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Todo", id },
        { type: "Todo", id: "PARTIAL-LIST" },
      ],
    }),
  })
});

export const {
  useGetTodoListQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
