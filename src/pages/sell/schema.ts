import { HeadCell, ISell } from '@/interfaces'
import { Buyer, CreatedAt, Invoice, SoldItems, ToolbarAction, TotalAmount } from './function'

export interface Data extends ISell {}

export function createData(
  _id: string,
  buyer: {
    _id: string
    name: string
    gst_number: string
    address: string
  },
  total_qty: number,
  total_amount: number,
  createdAt: string,
  invoice_no?: string
): Data {
  return {
    _id,
    buyer,
    total_qty,
    total_amount,
    createdAt,
    invoice_no
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'total_qty',
    numeric: true,
    disablePadding: true,
    label: 'Items',
    type: 'custom',
    body: SoldItems,
  },
  {
    id: 'total_amount',
    numeric: true,
    disablePadding: true,
    label: 'Total Amount',
    type: 'custom',
    body: TotalAmount,
  },
  {
    id: 'buyer',
    numeric: true,
    disablePadding: true,
    label: 'Export To',
    type: 'custom',
    body: Buyer,
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: true,
    label: 'Created On',
    type: 'custom',
    body: CreatedAt,
  },
  {
    id: 'invoice_no',
    numeric: true,
    disablePadding: true,
    label: 'Invoice',
    type: 'custom',
    body: Invoice,
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
