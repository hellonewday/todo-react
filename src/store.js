import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./redux/reducers/todos";
import labelReducer from "./redux/reducers/labels";

export const setUpStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
      labels: labelReducer,
    },
  });
};
