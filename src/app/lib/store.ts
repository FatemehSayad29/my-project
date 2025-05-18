import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/products/productsApi";
import { usersApi } from "../features/users/usersApi";
import selectedProductsReducer from "../features/selectedProducts/selectedProductsSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    selectedProducts: selectedProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
