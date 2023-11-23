import { createSlice } from "@reduxjs/toolkit";

export const counterReducer = createSlice({
  name: "counter",
  initialState: {
    forms: 0,
  },
  reducers: {
    increment: (state) => {
      state.forms += 1;
    },
    decrement: (state) => {
      state.forms -= 1;
    },
    incrementByAmount: (state, action) => {
      state.forms += action.payload;
    },
    decrementByAmount: (state, action) => {
      state.forms -= action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, decrementByAmount } =
  counterReducer.actions;

export default counterReducer.reducer;
