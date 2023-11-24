import { createSlice } from "@reduxjs/toolkit";
import {
  addTodo,
  completeTodo,
  editTodo,
  fetchTodos,
  removeTodo,
} from "../thunk/todos";

export const todosReducer = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    isInvalid: false,
    isEditInvalid: false,
    apiStatus: "idle",
  },
  reducers: {
    validateCreate: (state, action) => {
      state.isInvalid = !state.isInvalid;
    },
    validateEdit: (state, action) => {
      state.isEditInvalid = !state.isEditInvalid;
    },
    resetStatus: (state, action) => {
      state.apiStatus = "idle";
    },
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
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.apiStatus = "error";
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.apiStatus = "loading";
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.apiStatus = "fulfilled";
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
        }
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
        }
        state.apiStatus = "fulfilled";
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.apiStatus = "error";
      });
  },
});

export const { validateCreate, validateEdit, resetStatus } =
  todosReducer.actions;

export default todosReducer.reducer;
