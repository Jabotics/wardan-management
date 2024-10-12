import { buyerEndpoints } from "./buyer";
import { otherMaterialsEndpoints } from "./otherMaterial";
import { productsEndpoints } from "./product";
import { purchaseEndpoints } from "./purchase";
import { sellerEndpoints } from "./seller";
import { variantsEndpoints } from "./variant";

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
}