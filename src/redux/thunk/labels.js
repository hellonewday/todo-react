import { createAsyncThunk } from "@reduxjs/toolkit";
import { addLabelAPI, fetchLabelsAPI, removeLabelAPI } from "../apis/labels";
import { ADD_LABELS, FETCH_LABELS, REMOVE_LABEL } from "../constants/labels";

export const fetchLabels = createAsyncThunk(FETCH_LABELS, async () => {
  try {
    const labels = await fetchLabelsAPI();
    return labels;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addLabel = createAsyncThunk(ADD_LABELS, async (newLabel) => {
  try {
    const responseData = await addLabelAPI(newLabel);
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const removeLabel = createAsyncThunk(REMOVE_LABEL, async (id) => {
  try {
    const responseData = await removeLabelAPI(id);
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
});
