import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ADD_TODO,
  COMPLETE_TODO,
  EDIT_TODO,
  FETCH_TODO,
  GET_TODO,
  QUERY_TODO,
  REMOVE_TODO,
} from "../constants/todo";
import {
  addTodoAPI,
  completeTodoAPI,
  editTodoAPI,
  fetchTodoAPI,
  getByIdAPI,
  queryTodoAPI,
  removeTodoAPI,
} from "../apis/todo";

export const fetchTodo = createAsyncThunk(FETCH_TODO, async () => {
  try {
    const todoList = await fetchTodoAPI();
    return todoList;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const queryTodo = createAsyncThunk(QUERY_TODO, async (queryStr) => {
  try {
    const todoList = await queryTodoAPI(queryStr);
    return todoList;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getTodoById = createAsyncThunk(GET_TODO, async (id) => {
  try {
    const todo = await getByIdAPI(id);
    return todo;
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
