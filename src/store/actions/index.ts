import appSlice from './slices/appSlice'

import productsSlice, { productsApi } from "./slices/productsSlice"
import variantsSlice, { variantsApi } from "./slices/variantsSlice"
import importersSlice, { importersApi } from "./slices/importersSlice"
import exportersSlice, { exportersApi } from "./slices/exportersSlice"
import purchseSlice, { purchaseApi } from "./slices/purchaseSlice"
import otherMaterialsSlice, { otherMaterialsApi } from "./slices/otherMaterialsSlice"
import rawStockSlice, { rawStockApi } from "./slices/rawStockSlice"
import wastageSlice, { wastageApi } from "./slices/wastageSlice"
import exportsSlice, { exportsApi } from "./slices/exportSlice"
import readyProductStocksSlice, { readyProductStocksApi } from "./slices/readyProductStockSlice"
import assetsSlice, { assetsApi } from "./slices/assetsSlice"
import paymentsSlice, { paymentsApi } from "./slices/paymentSlice"
import receiptsSlice, { receiptsApi } from "./slices/receiptsSlice"
import getStockHistorySlice, { getStockHistoryApi } from "./slices/getStockHistory"
import getRemainingSlice, { getRemainingApi } from "./slices/getRemainingSlice"
import shipmentLogsSlice, { shipmentLogsApi } from "./slices/shipmentLogsSlice"
import materialUsageSlice, { materialUsageApi } from "./slices/materialUsageSlice"

export {
  appSlice,

  // data
  productsApi,
  productsSlice,
  variantsApi,
  variantsSlice,
  importersApi,
  importersSlice,
  exportersApi,
  exportersSlice,
  purchseSlice,
  purchaseApi,
  otherMaterialsSlice,
  otherMaterialsApi,
  rawStockSlice,
  rawStockApi,
  wastageSlice,
  wastageApi,
  readyProductStocksSlice,
  readyProductStocksApi,
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
  materialUsageSlice
}