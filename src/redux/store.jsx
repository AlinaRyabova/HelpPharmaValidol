import { configureStore } from "@reduxjs/toolkit";
import { drugsReducer } from "./drugsSlice";
import { filterReducer } from "./filterSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { drugsLSReducer } from "./drugsLSSlice";
import storage from "redux-persist/lib/storage";

const drugsLSConfig = {
  key: "drugsLS",
  storage,
  blacklist: "screenOrientation",
};

export const store = configureStore({
  reducer: {
    drugsLS: persistReducer(drugsLSConfig, drugsLSReducer),
    drugs: drugsReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
