import { combineReducers } from "@reduxjs/toolkit";


import { 
  appSlice,


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
  otherMaterialsApi,
  otherMaterialsSlice,
  rawStockApi,
  rawStockSlice,
  wastageApi,
  wastageSlice,
  readyProductStocksApi,
  readyProductStocksSlice,
  exportsApi,
  exportsSlice,
  assetsApi,
  assetsSlice,
  paymentsApi,
  paymentsSlice,
  receiptsApi,
  receiptsSlice,
  getStockHistoryApi,
  getStockHistorySlice,
  getRemainingApi,
  getRemainingSlice,
  shipmentLogsApi,
  shipmentLogsSlice,
  materialUsageApi,
  materialUsageSlice,
} from "./actions";

import { RequestHandler } from "./RequestHandler";

export const rootReducer = combineReducers({
  [RequestHandler.reducerPath]: RequestHandler.reducer,

  app: appSlice,
  
  products: productsSlice,
  variants: variantsSlice,
  importers: importersSlice,
  exporters: exportersSlice,
  purchase: purchseSlice,
  materials: otherMaterialsSlice,
  rawStocks: rawStockSlice,
  wastage: wastageSlice,
  readyProducts: readyProductStocksSlice,
  sell: exportsSlice,
  assets: assetsSlice,
  payments: paymentsSlice,
  receipts: receiptsSlice,
  stockHistory: getStockHistorySlice,
  remainings: getRemainingSlice,
  shipmentLogs: shipmentLogsSlice,
  materialUsage: materialUsageSlice,

  // CATEGORY
  [productsApi.reducerPath]: productsApi.reducer,
  [variantsApi.reducerPath]: variantsApi.reducer,
  [importersApi.reducerPath]: importersApi.reducer,
  [exportersApi.reducerPath]: exportersApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [otherMaterialsApi.reducerPath]: otherMaterialsApi.reducer,
  [rawStockApi.reducerPath]: rawStockApi.reducer,
  [wastageApi.reducerPath]: wastageApi.reducer,
  [readyProductStocksApi.reducerPath]: readyProductStocksApi.reducer,
  [exportsApi.reducerPath]: exportsApi.reducer,
  [assetsApi.reducerPath]: assetsApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
  [receiptsApi.reducerPath]: receiptsApi.reducer,
  [getStockHistoryApi.reducerPath]: getStockHistoryApi.reducer,
  [getRemainingApi.reducerPath]: getRemainingApi.reducer,
  [shipmentLogsApi.reducerPath]: shipmentLogsApi.reducer,
  [materialUsageApi.reducerPath]: materialUsageApi.reducer,
  
})