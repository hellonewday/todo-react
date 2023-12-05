import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { setUpStore } from "./redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={setUpStore()}>
      <App />
    </Provider>
  </QueryClientProvider>
);
