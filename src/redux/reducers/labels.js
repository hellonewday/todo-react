import { createSlice } from "@reduxjs/toolkit";
import { addLabel, fetchLabels, removeLabel } from "../thunk/labels";
import { fireToast } from "../../utils/toast.utils";
export const labelReducer = createSlice({
  name: "labels",
  initialState: {
    labels: [],
    apiLabelStatus: "idle",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLabels.pending, (state, action) => {
        state.apiLabelStatus = "loading";
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.apiLabelStatus = "idle";
        state.labels = action.payload;
      })
      .addCase(fetchLabels.rejected, (state, action) => {
        state.apiLabelStatus = "error";
      })
      .addCase(addLabel.pending, (state, action) => {
        state.apiLabelStatus = "loading";
      })
      .addCase(addLabel.fulfilled, (state, action) => {
        state.labels = [...state.labels, action.payload.data];
        state.apiLabelStatus = "fulfilled";
        fireToast("success", "Create category successfully", "colored");
      })
      .addCase(addLabel.rejected, (state, action) => {
        state.apiLabelStatus = "error";
        fireToast("error", "Create category failed", "colored");
      })
      .addCase(removeLabel.pending, (state, action) => {
        state.apiLabelStatus = "loading";
      })
      .addCase(removeLabel.fulfilled, (state, action) => {
        state.labels = state.labels.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.apiLabelStatus = "fulfilled";
        fireToast("info", "Delete category successfully", "light");
      });
  },
});

export default labelReducer.reducer;
