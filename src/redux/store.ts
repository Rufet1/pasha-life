import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoice-slice";
import productReducer from "./product-slice";

export default configureStore({
  reducer: {
    invoices: invoiceReducer,
    products: productReducer,
  },
});
