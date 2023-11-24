import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./redux/reducers/todos";

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
