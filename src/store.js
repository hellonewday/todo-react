import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./redux/reducers/todos";

export const setUpStore = (preloadState) => {
  return configureStore({
    reducer: {
      todos: todosReducer,
      preloadState,
    },
  });
};
