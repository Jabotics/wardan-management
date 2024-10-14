import { HeadCell } from '@/interfaces'
import { Product, Quantity } from './function';

export interface Data {
  _id: string
  product: { _id: string; name: string }
  qty: number
  unit: string
}

export function createData(
  _id: string,
  qty: number,
  unit: string,
  product: {
    _id: string
    name: string
  }
): Data {
  return {
    _id,
    product,
    qty,
    unit,
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'Product',
    type: 'custom',
    body: Product,
  },
  {
    id: 'qty',
    numeric: false,
    disablePadding: true,
    label: 'Quantity',
    type: 'custom',
    body: Quantity,
  },
]
