import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todo";
import labelReducer from "./reducers/labels";

export const setUpStore = () => {
  return configureStore({
    reducer: {
      todo: todoReducer,
      labels: labelReducer,
    },
  });
};
