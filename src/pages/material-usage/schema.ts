import { HeadCell, IMaterialUsage } from '@/interfaces'
import { CreatedAt, Item, Quantity, ToolbarAction } from './function'

export interface Data extends IMaterialUsage {}

export function createData(
  _id: string,
  category: 'PACKAGING_PRODUCT' | 'OTHER',
  items: {
    product?: {
      _id: string
      name: string
    }
    material?: {
      _id: string
      name: string
    }
    variant?: {
      _id: string
      name: string
    }
    qty: number
    _id: string
  }[],
  createdAt: string
): Data {
  return {
    _id,
    category,
    createdAt,
    items,
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'items',
    numeric: false,
    disablePadding: true,
    label: 'Item',
    type: 'custom',
    body: Item
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Quantity',
    type: 'custom',
    body: Quantity
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'Created On',
    type: 'custom',
    body: CreatedAt
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
