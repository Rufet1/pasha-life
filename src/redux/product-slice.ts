import { createSlice } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  name: "string";
  price: number;
  quantity: number;
};

export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    initializeProducts: (_state: Product[], { payload }) => {
      return payload;
    },
    reduceProduct: (state: any, { payload }) => {
      const product: any = state.find((product) => product.id === payload.id);
      const index = state.indexOf(product);
      const mutatedState = state;
      mutatedState[index] = {
        ...product,
        quantity: product?.quantity - payload.count,
      };
      return mutatedState;
    },
  },
});

export const { initializeProducts, reduceProduct } = productSlice.actions;

export default productSlice.reducer;
