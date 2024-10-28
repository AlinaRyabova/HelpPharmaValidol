import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://pharmacy-shop-backend.onrender.com/api/drugs";

export const fetchPharmacies = createAsyncThunk(
  "pharmacies/fetchAll",
  async (_, thunkAPI) => {
    try {
      const result = await axios.get("/pharmacies");
      return result.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchDrugs = createAsyncThunk(
  "drugs/fetchAll",
  async (_, thunkAPI) => {
    try {
      const result = await axios.get("/");
      return result.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const orderDrugs = createAsyncThunk(
  "drugs/order",
  async (orderData, thunkAPI) => {
    try {
      const result = await axios.post("/order-data", orderData);
      return result.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
