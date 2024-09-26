import { combineReducers } from "@reduxjs/toolkit";


import { 
  productsApi, 
  productsSlice,
  variantsApi,
  variantsSlice,
} from "./actions";

import { RequestHandler } from "./RequestHandler";

export const rootReducer = combineReducers({
  [RequestHandler.reducerPath]: RequestHandler.reducer,
  
  products: productsSlice,
  variants: variantsSlice,

  // CATEGORY
  [productsApi.reducerPath]: productsApi.reducer,
  [variantsApi.reducerPath]: variantsApi.reducer,
})