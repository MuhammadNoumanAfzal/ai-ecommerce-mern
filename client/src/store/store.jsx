import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice
  },
});
