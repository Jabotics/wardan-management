// PURCHASE
export const purchaseEndpoints = {


  /**
 * 
 * @api {post} /api/purchase/add-purchase-entry Add Purchase Entry
 * @apiName AddPurchaseEntry
 * 
 * @use to add a purchase entry (details + purchase-items)
 *
 * @payload {'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER'} category    /// category type
 * @payload {String} bill_no   /// bill number of the invoice
 * @payload {String} seller   /// id of the seller
 * @payload {@interface IPurchaseItem} items   /// item details
 * IPurchaseItem  --> interface/data/purchase.ts
 * 
 * @payload {Number} bill_amount   /// amount involved on the bill
 * @payload {Number} transportation_charge  
 * @payload {Number} unloading_charge  
 * @payload {Number} total_amount  
 */
  add_purchase_entry: '/api/purchase/add-purchase-entry',

  /**
 * @interface IPurchase  
 * Ipurchase -->  interfaces/data/purchase.ts
 * 
 * 
 * @api {get} /api/purchase/get-purchase-entry Get Purchase Entry
 * @apiName GetPurchaseEntry
 * 
 * @use  to get the details of the purchase (NOT purchase item & its details)
 * use get_item_details to fetch purchase item & its details
 *
 * @apiParam {'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER'} category    /// category type
 * @apiParam {String} sortBy   /// sort by name
 * @apiParam {'desc' | 'asc} sortOrder   /// sort order
 * @apiParam {Number} limit 
 * @apiParam {Number} offset 
 */
  get_purchase_details: '/api/purchase/get-purchase-details',

  /**
 * 
 * @api {put} /api/purchase/update-purchase-entry Update Purchase Entry
 * @apiName UpdatePurchaseEntry
 * 
 * @use to update the details of the purchase entry (NOT purchase items entry)
 *
 * @payload {String} _id   /// id of the purchase entry
 * @payload {String} bill_no   /// bill Number of the invoice
 * @payload {String} seller   /// seller id
 * @payload {Number} bill_amount   /// amount involved in the bill
 * @payload {Number} transportation_charge 
 * @payload {Number} unloading_charge 
 * @payload {Number} total_amount 
 */
  update_purchase_entry: '/api/purchase/update-purchase-entry',

  /**
 * 
 * @api {post} /api/purchase/add-item Add Purchase Item Entry (add_purchase_entry)
 * @apiName AddPurchaseItemEntry
 * 
 * @use to add a purchase item entry
 * when there exists an item and you want to add another entry
 *
 * @payload {String} purchaseId    /// id of the purchase entry
 * @payload {'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER'} category   /// category type
 * 
 * @payload {String} product    /// id of the product
 * Required for RAW_MATERIAL & PACKAGING_PRODUCT
 * 
 * @payload {String} variant    /// id of the variant
 * Required for PACKAGING_PRODUCT only
 * 
 * @payload {String} material    /// id of the other product
 * Required for OTHER product only
 * 
 * @payload {String} unit 
 * @payload {'gms' | 'kg' |'ton' |'pcs'} qty 
 * @payload {Number} amount 
 */ 
  add_purchase_item: '/api/purchase/add-item',

  /**
 * @interface IPurchaseItem  
 * IPurchaseItem -->  interfaces/data/purchase.ts
 * 
 * 
 * @api {get} /api/purchase/get-items-details Get Purchase Entry Items
 * @apiName GetPurchaseEntryItems
 * 
 * @use  to get the details of the purchase item & its details (NOT purchase details)
 * 
 * @how_to_use  modify the endpoint with purchase id to get its purchase item details
 * e.g., get-items-details/{PURCHASE_ID} /// to fetch all the purchase items of that purchase
 * 
 */
  get_item_details: '/api/purchase/get-items-details',

  /**
 * 
 * @api {put} /api/purchase/update-purchase-entry Update Purchase Entry
 * @apiName UpdatePurchaseEntryItem
 * 
 * @use to update the details of the purchase entry (NOT purchase items entry)
 *
 * @payload {String} _id   /// id of the purchase item entry
 * @payload {Number} qty   /// quantity of the purchase item
 * @payload {Number} amount   /// amount of the purchase item 
 */
  update_purchase_item: '/api/purchase/update-item',

  /**
 * 
 * @api {remove} /api/purchase/{PURCHASE_ITEM_ID} Remove Purchase Entry
 * @apiName RemovePurchaseEntryItem
 * 
 * @use to remove a purchase item
 */
  remove_purchase_item: '/api/purchase/item',

  /**
 * 
 * @api {remove} /api/purchase/{PURCHASE_ID} Remove Purchase
 * @apiName RemovePurchaseEntry
 * 
 * @use to remove the purchase
 */
  remove_purchase: '/api/purchase',

  upload_invoice: '/api/purchase/upload-invoice',
  remove_invoice: '/api/purchase/remove-invoice'
}