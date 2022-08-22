import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./form/formSlice.js";

let store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
