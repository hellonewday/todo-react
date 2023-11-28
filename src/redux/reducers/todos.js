import { createSlice } from "@reduxjs/toolkit";
import {
  addTodo,
  completeTodo,
  editTodo,
  fetchTodos,
  queryTodos,
  removeTodo,
} from "../thunk/todos";
import { fireToast } from "../../utils/toast.utils";

export const todosReducer = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    apiStatus: "idle",
  },
  reducers: {
    resetStatus: (state, action) => {
      state.apiStatus = "idle";
    },
    sortByProgressBar: (state, action) => {
      let sortTodos = state.todos.toSorted((a, b) => {
        return action.payload === "ASCENDING"
          ? a.progress - b.progress
          : b.progress - a.progress;
      });

      state.todos = sortTodos;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.apiStatus = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.apiStatus = "idle";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.apiStatus = "error";
      })
      .addCase(addTodo.pending, (state, action) => {
        state.apiStatus = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos = [...state.todos, action.payload.data];
        state.apiStatus = "fulfilled";
        fireToast("success", "Create task successfully", "colored");
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.apiStatus = "error";
        fireToast("error", "Create task failed", "colored");
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.apiStatus = "loading";
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.apiStatus = "fulfilled";
        fireToast("info", "Delete task successfully", "light");
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.apiStatus = "rejected";
      })
      .addCase(editTodo.pending, (state, action) => {
        state.apiStatus = "pending";
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        let updateTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (updateTodo) {
          updateTodo.title = action.payload.title;
          updateTodo.progress = action.payload.progress;
          updateTodo.completed = action.payload.completed;
          updateTodo.category = action.payload.category;
        }
        state.apiStatus = "fulfilled";
        fireToast("info", "Update task successfully", "colored");
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.apiStatus = "error";
      })
      .addCase(completeTodo.pending, (state, action) => {
        state.apiStatus = "pending";
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        let updateTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (updateTodo) {
          updateTodo.completed = action.payload.completed;
          updateTodo.progress = 100;
        }
        state.apiStatus = "fulfilled";
        fireToast("success", "Update task successfully", "light");
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.apiStatus = "error";
      })
      .addCase(queryTodos.pending, (state, action) => {
        state.apiStatus = 'pending';
      })
      .addCase(queryTodos.fulfilled, (state, action) => {
        state.apiStatus = "idle";
        state.todos = action.payload;
      })
      .addCase(queryTodos.rejected, (state, action) => {
        state.apiStatus = "error";
      });
  },
});

export const { resetStatus, sortByProgressBar } =
  todosReducer.actions;

export default todosReducer.reducer;
