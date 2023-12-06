import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todoApi } from "./apis/todoApi";
import { labelApi } from "./apis/labelApi";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });
export const setUpStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer: combineReducers({
      router: routerReducer,
      [todoApi.reducerPath]: todoApi.reducer,
      [labelApi.reducerPath]: labelApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        todoApi.middleware,
        labelApi.middleware,
        routerMiddleware,
      ]),
  });
};

setupListeners(setUpStore().dispatch);

export const history = createReduxHistory(setUpStore());
