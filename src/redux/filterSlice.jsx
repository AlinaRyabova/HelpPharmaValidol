import { createSlice } from "@reduxjs/toolkit";

const initialStateFilter = {
  input: "",
  pharm: "",
  alf: "",
  price: "",
  date: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialStateFilter,
  reducers: {
    setFilter: (state, action) => {
      state.input = action.payload;
    },
    setPhafm: (state, action) => {
      state.pharm = action.payload;
    },
    setAlf: (state, action) => {
      state.alf = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { setFilter, setPhafm, setAlf, setPrice, setDate } =
  filterSlice.actions;
