import axios from "axios";
import { API_URL } from "./constants";

export const fetchTodosAPI = async () => {
  try {
    let response = await axios.get(API_URL + "/lists");
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const addTodoAPI = async (newTodo) => {
  try {
    let response = await axios.post(API_URL + "/lists", newTodo);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editTodoAPI = async (id, editTodo) => {
  try {
    let response = await axios.patch(API_URL + "/lists/" + id, editTodo);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const completeTodoAPI = async (id) => {
  try {
    let response = await axios.patch(API_URL + "/lists/" + id, {
      completed: true,
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const removeTodoAPI = async (id) => {
  try {
    let response = await axios.delete(API_URL + "/lists/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
};
