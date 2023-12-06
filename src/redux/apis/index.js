import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = createApi({
  baseQuery,
  tagTypes: ["Todo", "Comment", "Label"],
  endpoints: (builder) => ({}),
});
