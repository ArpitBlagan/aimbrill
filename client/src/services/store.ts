import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tableApi } from "./Table";
const store = configureStore({
  reducer: {
    [tableApi.reducerPath]: tableApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([tableApi.middleware]),
});
setupListeners(store.dispatch);
export default store;
