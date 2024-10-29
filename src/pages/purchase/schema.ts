import { HeadCell } from '@/interfaces'
import { IPurchase } from '@/interfaces'
import {
  Total,
  UploadInvoice,
  CreatedAt,
  PurchaseItems,
  Seller,
  Invoice,
  ToolbarAction,
  InvoiceNo
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
  createdAt?: string,
  invoice_url?: string[]
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
    invoice_url
  }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'invoice_no',
    numeric: true,
    disablePadding: true,
    label: 'Invoice No',
    type: 'custom',
    body: InvoiceNo
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
    id: 'total_amount',
    numeric: true,
    disablePadding: true,
    label: 'Net Total',
    type: 'custom',
    body: Total,
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
    id: 'unloading_charge',
    numeric: true,
    disablePadding: true,
    label: '',
    type: 'custom',
    body: UploadInvoice,
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
