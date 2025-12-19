import api from "@/services/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "success" | "failed" | null;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: null,
  error: null,
};

export const fethProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async () => {
    const res:any = await api.get('/products/getAll')
    return res.data.products as Product[];
  }
);

// After (accept FormData)
export const addProduct = createAsyncThunk<Product, FormData>(
  "products/add",
  async (formData) => {
    const res = await api.post("/products/addproduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.product as Product;
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk<string, string>(
  "products/delete",
  async (id) => {
    await api.delete(`/products/delete/${id}`);
    return id;
  }
);
const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fethProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fethProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
          state.status = "success";
        }
      )
      .addCase(fethProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.items.push(action.payload);
          state.status = "success";
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
          state.status = "success";
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export default productsSlice.reducer;
