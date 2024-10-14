import appSlice from './slices/appSlice'

import productsSlice, { productsApi } from "./slices/productsSlice"
import variantsSlice, { variantsApi } from "./slices/variantsSlice"
import importersSlice, { importersApi } from "./slices/importersSlice"
import exportersSlice, { exportersApi } from "./slices/exportersSlice"
import purchseSlice, { purchaseApi } from "./slices/purchaseSlice"
import otherMaterialsSlice, { otherMaterialsApi } from "./slices/otherMaterialsSlice"
import rawStockSlice, { rawStockApi } from "./slices/rawStockSlice"
import wastageSlice, { wastageApi } from "./slices/wastageSlice"

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
}