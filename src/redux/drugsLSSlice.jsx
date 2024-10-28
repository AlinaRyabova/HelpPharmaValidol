/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { orderDrugs } from "./opertions";

const drugsLSInitialState = {
  favoriteDrugs: [],
  orderData: {
    user: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    drugsForShop: [],
  },
  screenOrientation: {
    screenWidth: 0,
    screenHeight: 0,
  },
};

const drugsLSSlice = createSlice({
  name: "drugsLS",
  initialState: drugsLSInitialState,
  reducers: {
    addFavoriteDrugs: (state, action) => {
      if (!state.favoriteDrugs.includes(action.payload)) {
        state.favoriteDrugs.push(action.payload);
      }
    },
    delFavoriteDrugs: (state, action) => {
      const index = state.favoriteDrugs.indexOf(action.payload);
      if (index === -1) {
        return null;
      }
      state.favoriteDrugs.splice(index, 1);
    },
    addDrFShop: (state, action) => {
      state.orderData.drugsForShop.push(action.payload);
    },
    delDrFShop: (state, action) => {
      const index = state.orderData.drugsForShop.findIndex(
        (d) => d.id === action.payload.id
      );
      if (index === -1) {
        return null;
      }
      state.orderData.drugsForShop.splice(index, 1);
    },
    setQuantityShop: (state, action) => {
      const index = state.orderData.drugsForShop.findIndex(
        (d) => d.id === action.payload.id
      );
      if (index === -1) {
        return null;
      }
      state.orderData.drugsForShop[index].quantity = action.payload.quantity;
    },
    delAllDrSh: (state) => {
      state.orderData.drugsForShop = [];
    },
    setUserName: (state, action) => {
      state.orderData.user.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.orderData.user.email = action.payload;
    },
    setUserPhone: (state, action) => {
      state.orderData.user.phone = action.payload;
    },
    setUserAddress: (state, action) => {
      state.orderData.user.address = action.payload;
    },
    delUserData: (state) => {
      state.orderData = {
        user: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
        drugsForShop: [],
      };
      state.orderData.drugsForShop = [];
    },
    setScreenOrientation: (state, action) => {
      state.screenOrientation.screenWidth = action.payload.screenWidth;
      state.screenOrientation.screenHeight = action.payload.screenHeight;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderDrugs.fulfilled, (state, action) => {
      state.orderData = {
        user: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
        drugsForShop: [],
      };
    });
  },
});

export const {
  addFavoriteDrugs,
  delFavoriteDrugs,
  addDrFShop,
  delDrFShop,
  setQuantityShop,
  delAllDrSh,
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserAddress,
  delUserData,
  setScreenOrientation,
} = drugsLSSlice.actions;

export const drugsLSReducer = drugsLSSlice.reducer;
