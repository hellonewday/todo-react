import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todo";
import labelReducer from "./reducers/labels";
import { pokemonApi } from "./apis/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todoApi } from "./apis/todoApi";
import { labelApi } from "./apis/labelApi";

export const setUpStore = () => {
  return configureStore({
    reducer: {
      todo: todoReducer,
      labels: labelReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [todoApi.reducerPath]: todoApi.reducer,
      [labelApi.reducerPath]: labelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        pokemonApi.middleware,
        todoApi.middleware,
        labelApi.middleware,
      ]),
  });
};

setupListeners(setUpStore().dispatch);
