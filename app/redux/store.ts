import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import productListReducer from "./productsSlice";
import productOperationReducer from "./productOperationSlice";
import userDetailsReducer from "./userDetailsSlice";

import { orderApi } from "./api/orderApi";
const store = configureStore({
  reducer: {
    loginDetails: loginReducer,
    productList:productListReducer,
    productOperations: productOperationReducer,
    userDetails:userDetailsReducer,

    //RTK Query
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderApi.middleware),

});

export default store;
