import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/product/productSlice";
//import logger from "redux-logger";
import { paginationProductReducer } from "./slices/product/paginationProductSlice";
import { categoryReducer } from "./slices/categorySlice";
import { productByIdReducer } from "./slices/product/ProductByIdSlice";
import { shoppingCartReducer } from "./slices/shoppingCartSlice";
import { loginReducer } from "./slices/user/loginSlice";
import { registerReducer } from "./slices/user/registerSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    productById: productByIdReducer,
    paginationProduct: paginationProductReducer,
    shoppingCart: shoppingCartReducer,
    category: categoryReducer,
    login:loginReducer,
    register:registerReducer
  },
//  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
