import axios from "axios";

export const fetchTodosAPI = async () => {
  try {
    let response = await axios.get(process.env.REACT_APP_API_URL + "/lists");
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const addTodoAPI = async (newTodo) => {
  try {
    let response = await axios.post(process.env.REACT_APP_API_URL + "/lists", newTodo);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editTodoAPI = async (id, editTodo) => {
  try {
    let response = await axios.patch(process.env.REACT_APP_API_URL + "/lists/" + id, editTodo);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const completeTodoAPI = async (id) => {
  try {
    let response = await axios.patch(process.env.REACT_APP_API_URL + "/lists/" + id, {
      completed: true,
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const removeTodoAPI = async (id) => {
  try {
    let response = await axios.delete(process.env.REACT_APP_API_URL + "/lists/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
};
