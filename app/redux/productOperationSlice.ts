import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";

const initialState: Product[] = [];

const productOperationSlice = createSlice({
  name: "productOperationSlice",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },

    removeProduct: (state, action) => {
      const id = action.payload;
      const existingProduct = state.find((p) => p.id === id);

      if (existingProduct?.quantity) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1; 
        } else {
          return state.filter((p) => p.id !== id);
        }
      }
    },

    clearProducts: () => {
      return [];
    },
  },
});

export const { addProduct, removeProduct, clearProducts } =
  productOperationSlice.actions;

export default productOperationSlice.reducer;
