import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
//import logger from "redux-logger";
import { paginationProductReducer } from "./slices/paginationProductSlice";
import { categoryReducer } from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    paginationProduct: paginationProductReducer,
    category: categoryReducer,
  },
});

export default store;
