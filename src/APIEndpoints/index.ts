import { buyerEndpoints } from "./endpoints/buyer";
import { exportEndpoints } from "./endpoints/export";
import { otherMaterialsEndpoints } from "./endpoints/otherMaterial";
import { productsEndpoints } from "./endpoints/product";
import { purchaseEndpoints } from "./endpoints/purchase";
import { rawStockEndpoints } from "./endpoints/rawStock";
import { readyProductStockEndpoints } from "./endpoints/readyProductStock";
import { sellerEndpoints } from "./endpoints/seller";
import { variantsEndpoints } from "./endpoints/variant";
import { wastageEndpoints } from "./endpoints/wastage";
import { assetsEndpoints } from "./endpoints/assets";
import { paymentsEndpoints } from "./endpoints/payments";
import { receiptsEndpoints } from "./endpoints/receipts";
import { materialUsageEndpoints } from "./endpoints/materialUsage";
import { expenseEndpoints } from "./endpoints/expense";
import { analysisEndpoints } from "./endpoints/analysis";
import { reportsEndpoints } from "./endpoints/reports";

export const APIEndPoints = {
  BackendURL: 'http://localhost:5000',
  // BackendURL: 'http://192.168.29.16:5000',

  // VARIANTS
  ...variantsEndpoints,

  // PRODUCTS
  ...productsEndpoints,

  // OTHER MATERIALS
  ...otherMaterialsEndpoints,

  // SELLERS / IMPORTERS
  ...sellerEndpoints,

  // BUYERS / EXPORTERS
  ...buyerEndpoints,

  // PURCHASE
  ...purchaseEndpoints,

  // RAW STOCK
  ...rawStockEndpoints,

  // WASTAGE
  ...wastageEndpoints,

  // READY PRODUCT STOCK
  ...readyProductStockEndpoints,

  // EXPORT
  ...exportEndpoints,

  // ASSET
  ...assetsEndpoints,

  // PAYMENT
  ...paymentsEndpoints,

  // RECEIPTS
  ...receiptsEndpoints,

  // MATERIAL USAGE
  ...materialUsageEndpoints,

  // EXPENSE
  ...expenseEndpoints,

  // PRODUCT WISE SELL
  ...analysisEndpoints,

  // REPORT
  ...reportsEndpoints,
}