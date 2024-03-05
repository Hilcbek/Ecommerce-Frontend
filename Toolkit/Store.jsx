import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./Slice";
import ProductSlice from "./ProductSlice";
let persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  user: userSlice,
  product : ProductSlice
});
let persistReducers = persistReducer(persistConfig, rootReducer);
export let Store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persist = persistStore(Store);