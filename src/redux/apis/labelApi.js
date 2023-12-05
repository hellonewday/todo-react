import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const labelApi = createApi({
  reducerPath: "labelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    timeout: 3000,
  }),
  endpoints: (builder) => ({
    getLabels: builder.query({
      query: () => `labels`,
    }),
  }),
});

export const { useGetLabelsQuery } = labelApi;
