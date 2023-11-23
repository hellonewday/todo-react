import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./redux/reducers/counter";
import todosReducer from "./redux/reducers/todos";

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});
