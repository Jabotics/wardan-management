/**
 * Interface representing a buyer's information.
 */
interface IBuyer {
  _id: string; 
  name: string; 
  gst_number: string
  address: string
}

/**
 * Interface representing a product's information.
 */
interface IProduct {
  _id: string; 
  name: string; 
}

/**
 * Interface representing a variant of a product.
 */
interface IVariant {
  _id: string; 
  name: string; 
}

/**
 * Base interface for sell-related data that contains common properties.
 */
interface ISellBase {
  total_qty: number; 
  total_amount: number; 
}

/**
 * Interface for adding a new sell record.
 * It extends the base sell properties and includes buyer and items information.
 */
export interface IAddSell extends ISellBase {
  buyer: string; 
  items: Array<{
    product: string; 
    variant: string; 
  } & ISellItemDetail>; 
}

/**
 * Interface representing a completed sell record.
 * It extends the base sell properties and includes additional metadata.
 */
export interface ISell extends ISellBase {
  _id: string; 
  buyer: IBuyer; 
  createdAt: string; 
}

/**
 * Interface containing detailed information about a sell item.
 */
interface ISellItemDetail {
  amount: number; 
  qty: number; 
}

/**
 * Interface representing a sell item, which includes product and variant details.
 */
export interface ISellItem extends ISellItemDetail {
  _id: string; 
  product: IProduct; 
  variant: IVariant; 
}

/**
 * Interface for updating a sell record.
 * It contains the sell record ID and the new buyer information.
 */
export interface IUpdateSell {
  _id: string; 
  buyer: string; 
}

/**
 * Interface for updating a specific sell item.
 * It includes item details and the total amounts post-update.
 */
export interface IUpdateSellItem extends ISellItemDetail {
  _id: string; 
  total_amount: number; 
}

/**
 * Interface for adding a sell item.
 * 
 */
export interface IAddSellItem extends ISellItemDetail {
  sellId: string
  product: string
  variant: string
}
