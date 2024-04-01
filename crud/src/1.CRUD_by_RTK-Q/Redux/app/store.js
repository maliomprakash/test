import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiData } from "../features/ApiSlice";
import userReducer from "../features/mutation";

export const store = configureStore({
  reducer: combineReducers({
    [apiData.reducerPath]: apiData.reducer,
    user: userReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiData.middleware),
});

setupListeners(store.dispatch);

// Check if userData is included in the store
console.log("-------->",store.getState().userData);
