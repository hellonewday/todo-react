import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ADD_TODO,
  COMPLETE_TODO,
  EDIT_TODO,
  FETCH_TODO,
  QUERY_TODO,
  REMOVE_TODO,
} from "../constants/todos";
import {
  addTodoAPI,
  completeTodoAPI,
  editTodoAPI,
  fetchTodosAPI,
  queryTodosAPI,
  removeTodoAPI,
} from "../apis/todos";

export const fetchTodos = createAsyncThunk(FETCH_TODO, async () => {
  try {
    const todos = await fetchTodosAPI();
    return todos;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const queryTodos = createAsyncThunk(QUERY_TODO, async (queryStr) => {
  try {
    const todos = await queryTodosAPI(queryStr);
    return todos;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addTodo = createAsyncThunk(ADD_TODO, async (newTodo) => {
  try {
    const responseData = await addTodoAPI(newTodo);
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const removeTodo = createAsyncThunk(REMOVE_TODO, async (id) => {
  try {
    const responseData = await removeTodoAPI(id);
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const editTodo = createAsyncThunk(EDIT_TODO, async (editTodo) => {
  try {
    const responseData = await editTodoAPI(editTodo.id, editTodo);
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const completeTodo = createAsyncThunk(COMPLETE_TODO, async (id) => {
  try {
    const responseData = await completeTodoAPI(id);
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
});
