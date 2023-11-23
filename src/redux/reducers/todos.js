import { createSlice } from "@reduxjs/toolkit";

const getIntialState = () => {
  let historyData = localStorage.getItem("data");
  return historyData ? JSON.parse(historyData) : [];
};

export const todosReducer = createSlice({
  name: "todos",
  initialState: {
    todos: getIntialState(),
    isInvalid: false,
    isEditInvalid: false,
  },
  reducers: {
    addTodo: (state, action) => {
      if (action.payload.title.length < 3) state.isInvalid = true;
      else {
        state.todos = [...state.todos, action.payload];
        state.isInvalid = false;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      if (action.payload.title.length < 3) state.isEditInvalid = true;
      else {
        let updateTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (updateTodo) {
          updateTodo.title = action.payload.title;
          state.isEditInvalid = false;
        }
      }
    },
    completeTodo: (state, action) => {
      let updateTodo = state.todos.find((todo) => todo.id === action.payload);
      if (updateTodo) updateTodo.completed = true;
    },
  },
});

export const { addTodo, removeTodo, editTodo, completeTodo } =
  todosReducer.actions;

export default todosReducer.reducer;
