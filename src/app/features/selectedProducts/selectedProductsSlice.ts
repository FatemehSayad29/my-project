import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/types/product";

interface SelectedProductsState {
  products: Product[];
}

const initialState: SelectedProductsState = {
  products: [],
};

const SelectedProductsSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      if (!state.products.find((p) => p.id === action.payload.id)) {
        state.products.push(action.payload);
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = SelectedProductsSlice.actions;
export default SelectedProductsSlice.reducer;
