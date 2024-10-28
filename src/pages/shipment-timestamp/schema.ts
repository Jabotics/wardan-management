import { HeadCell } from '@/interfaces'
import { Exporter, Product, Quantity, Price } from './function'

export interface Data {
  _id: string
  sellId: {
    _id: string
    buyer: {
      _id: string
      name: string
    }
  }
  product: {
    _id: string
    name: string
  }
  variant: {
    _id: string
    name: string
  }
  qty: number
  amount: number
}

export function createData(
  _id: string,
  sellId: {
    _id: string
    buyer: {
      _id: string
      name: string
    }
  },
  product: {
    _id: string
    name: string
  },
  variant: {
    _id: string
    name: string
  },
  qty: number,
  amount: number
): Data {
  return {
    _id,
    sellId,
    product,
    variant,
    qty,
    amount,
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'sellId',
    numeric: false,
    disablePadding: true,
    label: 'Export To',
    type: 'custom',
    body: Exporter,
  },
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
  {
    id: 'amount',
    numeric: false,
    disablePadding: true,
    label: 'Price',
    type: 'custom',
    body: Price,
  },
]
