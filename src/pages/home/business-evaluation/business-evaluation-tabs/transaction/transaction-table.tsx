import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { indianStyleAmount } from '@/lib/utils'
import { RootState } from '@/store'
import { useGetAllExportersQuery } from '@/store/actions/slices/exportersSlice'
import { useGetAllImportersQuery } from '@/store/actions/slices/importersSlice'
import { useAppSelector } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'

// Define the structure for invoice
type Invoice = {
  _id?: string
  name: string
  gst_number: string
  payable_amount?: string | number
  outstanding_amount?: string | number
}

export function TransactionTable() {
  const { selectedTable } = useAppSelector((state: RootState) => state.app)
  const navigate = useNavigate()

  const { exporters, total_outstanding_amount } = useAppSelector(
    (state: RootState) => state.exporters
  )
  const { importers, total_payable_amount } = useAppSelector(
    (state: RootState) => state.importers
  )

  useGetAllExportersQuery(
    {
      sortOrder: 'desc',
      sortBy: 'outstanding_amount',
    },
    {
      refetchOnMountOrArgChange: true,
      skip: selectedTable === 'to-pay',
    }
  )

  useGetAllImportersQuery(
    {
      sortOrder: 'desc',
      sortBy: 'payable_amount',
    },
    {
      refetchOnMountOrArgChange: true,
      skip: selectedTable === 'to-receive',
    }
  )

  const invoices: Invoice[] = selectedTable === 'to-pay' ? importers : exporters

  return (
    <div className='flex h-[90%] w-full flex-col justify-between overflow-y-auto overflow-x-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-fit'>Trader</TableHead>
            <TableHead>GST Number</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell
                className='cursor-pointer font-mono font-semibold underline'
                onClick={() =>
                  navigate(
                    selectedTable === 'to-pay'
                      ? 'import-contacts'
                      : 'export-contacts'
                  )
                }
              >
                {invoice.name}
              </TableCell>
              <TableCell className='text-xs tracking-wider text-gray-500'>
                {invoice.gst_number}
              </TableCell>
              <TableCell
                className={`text-right ${selectedTable !== 'to-pay' ? 'text-green-700' : 'text-red-700'}`}
              >
                {selectedTable === 'to-pay'
                  ? invoice.payable_amount
                  : invoice.outstanding_amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className='text-right'>
              ₹
              {indianStyleAmount(
                Number(
                  selectedTable === 'to-pay'
                    ? total_payable_amount
                    : total_outstanding_amount
                )
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div
        className='w-full cursor-pointer text-center text-xs text-gray-500 underline'
        onClick={() =>
          navigate(
            selectedTable === 'to-pay' ? 'import-contacts' : 'export-contacts'
          )
        }
      >
        See All
      </div>
    </div>
  )
}
