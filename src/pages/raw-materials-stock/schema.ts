import { HeadCell, IRawMaterialStock } from "@/interfaces";
import { Product, Quantity, ToolbarAction } from "./function";

export interface Data extends IRawMaterialStock {}

export function createData(
  _id: string,
  category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER',
  product: {
    _id: string,
    name: string
  },
  qty: number,
  unit: string
): Data {
  return {
    _id,
    category,
    product,
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
    id: 'qty',
    numeric: false,
    disablePadding: true,
    label: 'Quantity',
    type: 'custom',
    body: Quantity
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: true,
    label: '',
    type: 'custom',
    body: ToolbarAction
  },
]