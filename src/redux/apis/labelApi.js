import { api } from ".";

export const labelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLabels: builder.query({
      query: () => `labels`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Label", id })),
              { type: "Label", id: "LIST" },
            ]
          : [{ type: "Label", id: "LIST" }],
    }),
    addLabel: builder.mutation({
      query: ({ ...label }) => ({
        url: "labels",
        method: "POST",
        body: label,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Label", id }],
    }),
  }),
});

export const { useGetLabelsQuery, useAddLabelMutation } = labelApi;
