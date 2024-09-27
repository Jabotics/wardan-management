import { HeadCell } from '@/interfaces'
import { ISeller } from '@/interfaces/data'
import { Address, GSTNumber } from './function'

export interface Data extends ISeller {}

export function createData(
  _id: string,
  name: string,
  address: string,
  gst_number: string,
  phone: string
): Data {
  return { _id, name, address, gst_number, phone }
}

export const headCells: HeadCell<Data>[] = [
  {
    id: 'name',
    numeric: true,
    disablePadding: true,
    label: 'Name',
    type: 'string',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
    type: 'custom',
    body: Address,
  },
  {
    id: 'gst_number',
    numeric: true,
    disablePadding: false,
    label: 'GST Number',
    type: 'custom',
    body: GSTNumber,
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
    type: 'string',
  },
]
