import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
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
    const res = await fetch("http://localhost:5000/api/products/getAll");
    const data = await res.json();
    return data.products as Product[];
  }
);

export const addProduct = createAsyncThunk<Product, Product>(
  "products/add",
  async (product) => {
    const res = await fetch("http://localhost:5000/api/products/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    return data.product as Product;
  }
);

export const deleteProduct = createAsyncThunk<string, string>(
  "products/delete",
  async (id) => {
    const res = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
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
