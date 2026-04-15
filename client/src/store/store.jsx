import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice"
import ShopProductSlice from "./shop/product-slice" 
import shopCartSlice from "./shop/cart-slice/index"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: ShopProductSlice,
    cart: shopCartSlice,


  },
});
