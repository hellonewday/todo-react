import api from ".";

export const fetchTodoAPI = async () => {
  try {
    let response = await api.get("/lists");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const queryTodoAPI = async (query) => {
  try {
    let response = await api.get("/lists?" + query);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addTodoAPI = async (newTodo) => {
  try {
    let response = await api.post("/lists", newTodo);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editTodoAPI = async (id, editTodo) => {
  try {
    let response = await api.patch("/lists/" + id, editTodo);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const completeTodoAPI = async (id) => {
  try {
    let response = await api.patch("/lists/" + id, {
      completed: true,
      progress: 100,
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const removeTodoAPI = async (id) => {
  try {
    let response = await api.delete("/lists/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
};
