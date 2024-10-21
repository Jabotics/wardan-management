// EXPORT
export const exportEndpoints = {

  /**
 * @interface IAddSell  
 * IAddSell --> interfaces/data/sell.ts
 * 
 * @api {post} /api/sell/add-sell Add a New Sell
 * @apiName AddSell
 * 
 * @use  To create a new sell record in the system.
 * This endpoint accepts buyer and item details to register a sale.
 * 
 * @payload {String} buyer   /// ID of the buyer making the purchase
 * @payload {Array} items    /// Array of items being sold, each containing product and variant identifiers
 * @payload {String} items.product   /// ID of the product
 * @payload {String} items.variant   /// ID of the variant
 * @payload {Number} total_qty   /// Total quantity of items in the sell
 * @payload {Number} total_amount   /// Total amount for the sale
 * 
 * @apiSuccess {String} _id   /// Unique identifier of the newly created sell record
 * @apiSuccess {Number} total_qty   /// Total quantity of items in the sell
 * @apiSuccess {Number} total_amount   /// Total amount for the sale
 * @apiSuccess {String} createdAt   /// Timestamp of when the sell record was created
 */
  add_sell: '/api/sell/add-sell',

    /**
 * @interface IAddSellItem  
 * IAddSell --> interfaces/data/sell.ts
 * 
 * @api {post} /api/sell/add-sell-item Add a New Sell
 * @apiName AddSellItem
 * 
 * @use  To create a new sell record in the system.
 * This endpoint accepts buyer and item details to register a sale.
 * 
 * @payload {String} sellId   /// ID of the buyer making the purchase
 * @payload {String} product   /// ID of the product
 * @payload {String} variant   /// ID of the variant
 * @payload {Number} qty   /// Quantity of items in the sell
 * @payload {Number} amount   /// Amount for the sale
 * 
 * @apiSuccess {String} _id   /// Unique identifier of the newly created sell record
 * @apiSuccess {Number} total_qty   /// Total quantity of items in the sell
 * @apiSuccess {Number} total_amount   /// Total amount for the sale
 * @apiSuccess {String} createdAt   /// Timestamp of when the sell record was created
 */
    add_sell_item: '/api/sell/add-sell-item',

  /**
 * @api {get} /api/sell/get-sells Retrieve All Sells
 * @apiName GetSells
 * 
 * @use  To retrieve a list of all sell records.
 * 
 * @apiParam {Number} limit   /// Maximum number of records to return
 * @apiParam {Number} offset   /// Number of records to skip for pagination
 * 
 * @apiSuccess {Array} sells   /// Array of sell records
 * @apiSuccess {String} sells._id   /// Unique identifier of the sell record
 * @apiSuccess {IBuyer} sells.buyer   /// Buyer information
 * @apiSuccess {Number} sells.total_qty   /// Total quantity of items sold
 * @apiSuccess {Number} sells.total_amount   /// Total amount of the sell
 * @apiSuccess {String} sells.createdAt   /// Timestamp of when the sell record was created
 */
  get_sells: '/api/sell/get-sells',

  /**
 * @api {get} /api/sell/get-sell-items/{SELL_ID} Retrieve Sell Items
 * @apiName GetSellItems
 * 
 * @use  To retrieve items associated with a specific sell record.
 * 
 * @apiParam {String} sellId   /// ID of the sell record for which items are requested
 * 
 * @apiSuccess {Array} items   /// Array of sell items
 * @apiSuccess {String} items._id   /// Unique identifier of the sell item
 * @apiSuccess {IProduct} items.product   /// Product information
 * @apiSuccess {IVariant} items.variant   /// Variant information
 * @apiSuccess {Number} items.qty   /// Quantity of the item sold
 * @apiSuccess {Number} items.amount   /// Amount for the specific item sold
 */
  get_sell_items: '/api/sell/get-sell-items',

  /**
 * @api {put} /api/sell/update-sell Update a Sell Record
 * @apiName UpdateSell
 * 
 * @use  To update the details of an existing sell record.
 * 
 * @payload {String} _id   /// Unique identifier of the sell record to be updated
 * @payload {String} buyer   /// New ID of the buyer
 * 
 * @apiSuccess {String} _id   /// Unique identifier of the updated sell record
 * @apiSuccess {String} buyer   /// Updated buyer ID
 */
  update_sell: '/api/sell/update-sell',

  /**
 * @api {put} /api/sell/update-sell-item Update a Sell Item
 * @apiName UpdateSellItem
 * 
 * @use  To update the details of a specific sell item.
 * 
 * @payload {String} _id   /// Unique identifier of the sell item to be updated
 * @payload {Number} qty   /// New quantity of the item sold
 * @payload {Number} amount   /// New amount for the specific item sold
 * @payload {Number} total_amount   /// Updated total amount of the sell
 * @payload {Number} total_qty   /// Updated total quantity of items sold
 * 
 * @apiSuccess {String} _id   /// Unique identifier of the updated sell item
 * @apiSuccess {Number} qty   /// Updated quantity of the item sold
 * @apiSuccess {Number} amount   /// Updated amount for the specific item sold
 */
  update_sell_item: '/api/sell/update-sell-item',

  /**
 * @api {delete} /api/sell/remove-sell-item/{SELL_ID} Remove a Sell Item
 * @apiName RemoveSellItem
 * 
 * @use  To remove a specific sell item from a sell record.
 * 
 * @apiSuccess {String} message   /// Confirmation message indicating successful removal
 */
  remove_sell_item: '/api/sell/remove-sell-item',

  /**
 * @api {delete} /api/sell/remove-sell/{SELL_ITEM_ID} Remove a Sell Record
 * @apiName RemoveSell
 * 
 * @use  To remove an entire sell record from the system.
 * 
 * @apiSuccess {String} message   /// Confirmation message indicating successful removal
 */
  remove_sell: '/api/sell/remove-sell',

  generate_sell_invoice: 'api/sell/generate-invoice'
}