/**
 * Enum representing the categories of wastage.
 * - RAW_MATERIAL: Represents raw materials that are wasted.
 * - PACKAGING_PRODUCT: Represents packaging products that are wasted.
 * - OTHER: Represents any other types of wastage not covered by the above categories.
 */
type Category = 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER';

/**
 * Interface representing a product.
 * - _id: Unique identifier for the product.
 * - name: The name of the product.
 */
type IProduct = {
  _id: string;
  name: string;
}

/**
 * Interface representing an item in the wastage record.
 * - _id: Unique identifier for the item.
 * - product: The product associated with this item.
 * - qty: The quantity of the product that is wasted.
 * - unit: The unit of measurement for the quantity (e.g., kg, liters).
 */
type IItem = {
  _id: string;
  product: IProduct;
  qty: number;
  unit: string;
}

/**
 * Interface representing a wastage record.
 * - _id: Unique identifier for the wastage record.
 * - category: The category of wastage, defined by the Category enum.
 * - items: An array of items that are part of this wastage record.
 */
export interface IWastage {
  _id: string;
  category: Category;
  items: IItem[];
}
