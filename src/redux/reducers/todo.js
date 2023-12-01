import { createSlice } from "@reduxjs/toolkit";
import {
  addTodo,
  completeTodo,
  editTodo,
  fetchTodo,
  queryTodo,
  removeTodo,
} from "../thunk/todo";
import { fireToast } from "../../utils/toast.utils";

export const todoReducer = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    apiStatus: "idle",
  },
  reducers: {
    resetStatus: (state, action) => {
      state.apiStatus = "idle";
    },
    sortByProgressBar: (state, action) => {
      let sortTodo = state.todoList.data.toSorted((a, b) => {
        return action.payload === "ASCENDING"
          ? a.progress - b.progress
          : b.progress - a.progress;
      });

      state.todoList.data = sortTodo;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodo.pending, (state, action) => {
        state.apiStatus = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.apiStatus = "idle";
        state.todoList = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.apiStatus = "error";
      })
      .addCase(addTodo.pending, (state, action) => {
        state.apiStatus = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
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
        state.todoList.data = state.todoList.data.filter(
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
        let updateTodo = state.todoList.data.find(
          (todo) => todo.id === action.payload.id
        );
        if (updateTodo) {
          updateTodo.title = action.payload.title;
          updateTodo.progress = action.payload.progress;
          updateTodo.completed = action.payload.completed;
          updateTodo.category = action.payload.category;
          updateTodo.updated = action.payload.updated;
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
        let updateTodo = state.todoList.data.find(
          (todo) => todo.id === action.payload.id
        );
        if (updateTodo) {
          updateTodo.completed = action.payload.completed;
          updateTodo.progress = 100;
          updateTodo.updated = action.payload.updated;
        }
        state.apiStatus = "fulfilled";
        fireToast("success", "Update task successfully", "light");
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.apiStatus = "error";
      })
      .addCase(queryTodo.pending, (state, action) => {
        state.apiStatus = "pending";
      })
      .addCase(queryTodo.fulfilled, (state, action) => {
        state.apiStatus = "idle";
        state.todoList = action.payload;
      })
      .addCase(queryTodo.rejected, (state, action) => {
        state.apiStatus = "error";
      });
  },
});

export const { resetStatus, sortByProgressBar } = todoReducer.actions;

export default todoReducer.reducer;
