import { combineReducers } from "@reduxjs/toolkit";
import { categoriesApi, categorySlice } from "./actions";
import { RequestHandler } from "./RequestHandler";

export const rootReducer = combineReducers({
  [RequestHandler.reducerPath]: RequestHandler.reducer,
  
  category: categorySlice,

  // CATEGORY
  [categoriesApi.reducerPath]: categoriesApi.reducer,
})