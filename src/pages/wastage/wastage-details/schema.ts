import { HeadCell, IWastage } from '@/interfaces'
import { CreatedAt, Product } from './function';

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
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: '',
    type: 'custom',
    body: CreatedAt,
  },
]
