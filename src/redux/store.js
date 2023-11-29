import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todos";
import labelReducer from "./reducers/labels";

export const setUpStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
      labels: labelReducer,
    },
  });
};
