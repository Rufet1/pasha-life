import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Invoice = {
  id: string;
  invoiceNumber: string;
  fullName: string;
  quantity: number;
  price: number;
  status: string;
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    initializeInvoices: (_state: Invoice[], { payload }) => {
      return payload;
    },
    changeInvoiceStatus: (state: any, { payload }) => {
      const invoice = state.find((invoice) => invoice.id === payload.invoiceId);
      const changedInvoice = { ...invoice, status: payload.status };
      const index = state.indexOf(invoice);
      state[index] = changedInvoice;
      return state;
    },
    deleteInvoice: (state: any, { payload }) => {
      return state.filter((invoice) => invoice.id !== payload);
    },

    addInvoice: (
      state: any[],
      {
        payload: {
          invoiceNumber,
          fullName,
          status,
          product,
          allQuantity,
          allPrice,
        },
      }
    ) => {
      const invoice = {
        id: uuidv4(),
        invoiceNumber,
        fullName,
        product,
        status,
        allQuantity,
        allPrice,
      };
      state.unshift(invoice);
    },
    editInvoice: (
      state: any[],
      { payload: { invoiceNumber, fullName, product, allQuantity, allPrice } }
    ) => {
      const invoice = state.find((i) => i.invoiceNumber === invoiceNumber);
      const index = state.indexOf(invoice);
      const stateClone: any = state;
      stateClone[index] = {
        ...invoice,
        fullName,
        product,
        allQuantity,
        allPrice,
      };
      return stateClone;
    },
  },
});

export const {
  addInvoice,
  editInvoice,
  initializeInvoices,
  deleteInvoice,
  changeInvoiceStatus,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
