import { HeadCell, IPackagingProductStock } from "@/interfaces";
import { Product, Quantity, Variant } from "./function";

export interface Data extends IPackagingProductStock {}

export function createData(
  _id: string,
  category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER',
  product: {
    _id: string,
    name: string
  },
  variant: {
    _id: string;
    name: string;
  },
  qty: number,
  unit: string
): Data {
  return {
    _id,
    category,
    product,
    variant,
    qty,
    unit
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'Product',
    type: 'custom',
    body: Product
  },
  {
    id: 'variant',
    numeric: false,
    disablePadding: true,
    label: 'Variant',
    type: 'custom',
    body: Variant
  },
  {
    id: 'qty',
    numeric: false,
    disablePadding: true,
    label: 'Quantity',
    type: 'custom',
    body: Quantity
  },
]