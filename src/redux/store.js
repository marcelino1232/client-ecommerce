import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/product/productSlice";
//import logger from "redux-logger";
import { paginationProductReducer } from "./slices/product/paginationProductSlice";
import { categoryReducer } from "./slices/categorySlice";
import { productByIdReducer } from "./slices/product/productByIdSlice";
import { shoppingCartReducer } from "./slices/shoppingCartSlice";
import { loginReducer } from "./slices/user/loginSlice";
import { registerReducer } from "./slices/user/registerSlice";
import { signOutReducer } from "./slices/user/signOut";
import { userAddressReducer } from "./slices/userAddress/userAddressSlice";
import { userAddressByIdReducer } from "./slices/userAddress/userAddressByIdSlice";
import { userAddressCrudReducer } from "./slices/userAddress/userAddressCrudSlice";
import { wishByIdReducer } from "./slices/wish/wishByIdSlice";
import { wishesReducer } from "./slices/wish/wishSlice";
import { orderReducer } from "./slices/order/orderSlice";
import { orderByIdReducer } from "./slices/order/orderByIdSlice";
import { reviewReducer } from "./slices/review/reviewSlice";
import { reviewCrudReducer } from "./slices/review/reviewCrudSlice";
import { reviewByProductIdReducer } from "./slices/review/reviewByProductIdSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    productById: productByIdReducer,
    paginationProduct: paginationProductReducer,
    shoppingCart: shoppingCartReducer,
    category: categoryReducer,
    login: loginReducer,
    signOut: signOutReducer,
    register: registerReducer,
    userAddress: userAddressReducer,
    userAddressById: userAddressByIdReducer,
    userAddressCrud: userAddressCrudReducer,
    wishes: wishesReducer,
    wishById: wishByIdReducer,
    order: orderReducer,
    orderById: orderByIdReducer,
    review: reviewReducer,
    reviewCrud: reviewCrudReducer,
    reviewByProduct: reviewByProductIdReducer,
  },
  //  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
