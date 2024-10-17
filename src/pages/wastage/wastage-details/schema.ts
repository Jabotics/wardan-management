import { HeadCell, IWastage } from '@/interfaces'
import { CreatedAt, Product, Quantity, ToolbarAction } from './function';

export interface Data extends IWastage {}

export function createData(
  _id: string,
  category: IWastage['category'],
  items: IWastage['items'],
  createdAt: string
): Data {
  return {
    _id,
    category,
    items,
    createdAt
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'items',
    numeric: false,
    disablePadding: true,
    label: 'Items',
    type: 'custom',
    body: Product,
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Total Waste',
    type: 'custom',
    body: Quantity,
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'Created At',
    type: 'custom',
    body: CreatedAt,
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
