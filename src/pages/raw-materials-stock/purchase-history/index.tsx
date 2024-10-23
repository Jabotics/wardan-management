// import { useGetStockHistoryQuery } from '@/store/actions/slices/rawStockSlice'
import { Data } from '../schema'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useNavigate } from 'react-router-dom'

import { IoInformationCircleOutline } from 'react-icons/io5'
import Tooltip from '@mui/material/Tooltip'
import { formatDateToIST } from '@/lib/utils'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { useGetStockHistoryQuery } from '@/store/actions/slices/getStockHistory'
import { useState } from 'react'

const wastageRemarks = [
  'Regrettably, it went to waste',
  'Apologies, we experienced some loss',
  'Sadly, it was not utilized',
  'Unfortunately, it ended up discarded',
  'Sorry, we had some spoilage',
  'It’s unfortunate, but it got thrown away',
  'Regretfully, it was not salvaged',
  'We apologize for the waste incurred',
  'Sadly, it was wasted',
  'Unfortunately, it could not be saved',
]

const PurchaseHistoryComponent = ({ data }: { data: Data }) => {
  const navigate = useNavigate()

  const isRawMaterialNeverPurchased = data._id !== ''
  const [offset, setOffset] = useState<number>(0)

  useGetStockHistoryQuery(
    {
      productId: data.product._id,
      limit: 5,
      offset,
    },
    {
      skip: !isRawMaterialNeverPurchased,
      refetchOnMountOrArgChange: true,
    }
  )
  const { stockHistory } = useAppSelector(
    (state: RootState) => state.stockHistory
  )

  return (
    <div className='flex h-60 w-full flex-col gap-2 overflow-y-auto overflow-x-hidden'>
      <div className='my-3 text-center text-xs text-gray-400'>
        Recent Activities
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Status</TableHead>
            <TableHead className={`flex max-w-60 items-center gap-2`}>
              Trader{' '}
              <Tooltip
                title={
                  <div className='flex flex-col items-center justify-center gap-1 px-5 py-1'>
                    If Applicable
                  </div>
                }
                placement='top'
              >
                <span>
                  <IoInformationCircleOutline className='size-5 cursor-pointer text-gray-500' />
                </span>
              </Tooltip>
            </TableHead>
            <TableHead className='min-w-60 max-w-[10vw]'>Time</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead className='text-right'>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockHistory.map((history, index) => {
            const remarks =
              history.status === 'wastage'
                ? wastageRemarks[
                    Math.floor(Math.random() * wastageRemarks.length)
                  ]
                : ''

            console.log(remarks)

            return (
              <TableRow key={index}>
                <TableCell className='font-medium'>
                  {history.status.charAt(0).toUpperCase() +
                    history.status.substring(1)}
                </TableCell>
                <TableCell
                  onClick={() => navigate('/import-contacts')}
                  className={`${history.seller ? 'cursor-pointer underline' : 'text-gray-400'}`}
                >
                  {history?.seller ?? 'N/A'}
                </TableCell>
                <TableCell className='text-xs text-gray-500'>
                  {history?.createdAt
                    ? formatDateToIST(history.createdAt)
                    : null}
                </TableCell>
                <TableCell>{remarks}</TableCell>
                <TableCell
                  className={`text-right ${history.status === 'purchaseItem' ? 'text-green-700' : 'text-red-700'}`}
                >
                  {history.status === 'purchaseItem'
                    ? '+' + history.qty
                    : '-' + history.qty}{' '}
                  kg
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className='text-right text-lg'>{data.qty} kg</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default PurchaseHistoryComponent
