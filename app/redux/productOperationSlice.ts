import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";

const initialState:Product[] = [];

const productOperationSlice = createSlice({
    name: "productOperationSlice",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log("Adding product:", action.payload);
            state.push(action.payload);
        },
        removeProduct: (state, action) => {
            return state.filter(product => product.id !== action.payload);
        },
        clearProducts: (state) => {
            return [];
        }
    },
})

export const { addProduct, removeProduct } = productOperationSlice.actions;
export default productOperationSlice.reducer;