import { combineReducers } from "@reduxjs/toolkit";


import { 
  productsApi, 
  productsSlice,
  variantsApi,
  variantsSlice,
  importersApi,
  importersSlice,
  exportersApi,
  exportersSlice,
  purchaseApi,
  purchseSlice,
} from "./actions";

import { RequestHandler } from "./RequestHandler";

export const rootReducer = combineReducers({
  [RequestHandler.reducerPath]: RequestHandler.reducer,
  
  products: productsSlice,
  variants: variantsSlice,
  importers: importersSlice,
  exporters: exportersSlice,
  purchase: purchseSlice,

  // CATEGORY
  [productsApi.reducerPath]: productsApi.reducer,
  [variantsApi.reducerPath]: variantsApi.reducer,
  [importersApi.reducerPath]: importersApi.reducer,
  [exportersApi.reducerPath]: exportersApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
})