import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./redux/reducers/todos";

export const setUpStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer
    },
  });
};
