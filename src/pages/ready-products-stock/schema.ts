import { HeadCell, IReadyProductStock } from "@/interfaces";
import { LastUpdated, Price, Product, Quantity, ToolbarAction, Variant } from "./function";

export interface Data extends IReadyProductStock {}

export function createData(
  _id: string,
  product: {
    _id: string,
    name: string,
  },
  variant: {
    _id: string,
    name: string,
  },
  qty: number,
  unit: string,
  mrp: number,
  count: number,
  c2c: number,
  updatedAt: string
): Data {
  return {
    _id,
    product,
    variant,
    qty,
    unit,
    mrp,
    count,
    c2c,
    updatedAt,
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
    id: 'updatedAt',
    numeric: false,
    disablePadding: true,
    label: 'Last Updated',
    type: 'custom',
    body: LastUpdated
  },
  {
    id: 'mrp',
    numeric: false,
    disablePadding: true,
    label: 'M.R.P',
    type: 'custom',
    body: Price
  },
  {
    id: 'qty',
    numeric: false,
    disablePadding: true,
    label: 'Current Stock',
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