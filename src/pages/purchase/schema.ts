import { HeadCell } from '@/interfaces'
import { IPurchase } from '@/interfaces'
import {
  Transportation,
  Total,
  Unloading,
  PurchaseItems,
  Seller,
  Invoice,
  ToolbarAction,
} from './function'

export interface Data extends IPurchase {}

export function createData(
  _id: string,
  invoice_no: string,
  seller: {
    _id: string
    name: string
    address: string
    gst_number: string
  },
  category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER',
  invoice_amount: number,
  transportation_charge: number,
  unloading_charge: number,
  total_amount: number,
  createdAt?: string
): Data {
  return {
    _id,
    invoice_no,
    seller,
    category,
    invoice_amount,
    transportation_charge,
    unloading_charge,
    total_amount,
    createdAt,
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'invoice_no',
    numeric: true,
    disablePadding: true,
    label: 'Invoice No',
    type: 'string',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: true,
    label: 'Items',
    type: 'custom',
    body: PurchaseItems,
  },
  {
    id: 'seller',
    numeric: true,
    disablePadding: true,
    label: 'Imported From',
    type: 'custom',
    body: Seller,
  },
  {
    id: 'invoice_amount',
    numeric: true,
    disablePadding: true,
    label: 'Invoice',
    type: 'custom',
    body: Invoice,
  },
  {
    id: 'transportation_charge',
    numeric: true,
    disablePadding: true,
    label: 'Transportation',
    type: 'custom',
    body: Transportation,
  },
  {
    id: 'unloading_charge',
    numeric: true,
    disablePadding: true,
    label: 'Loading-Unloading',
    type: 'custom',
    body: Unloading,
  },
  {
    id: 'total_amount',
    numeric: true,
    disablePadding: true,
    label: 'Net Total',
    type: 'custom',
    body: Total,
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
