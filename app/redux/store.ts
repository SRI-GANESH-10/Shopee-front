import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import productListReducer from "./productsSlice";
import productOperationReducer from "./productOperationSlice";
import userDetailsReducer from "./userDetailsSlice";

const store = configureStore({
  reducer: {
    loginDetails: loginReducer,
    productList:productListReducer,
    productOperations: productOperationReducer,
    userDetails:userDetailsReducer,
  },
});

export default store;
