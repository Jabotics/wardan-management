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
import { useState, useEffect, useRef } from 'react'

const PurchaseHistoryComponent = ({ data }: { data: Data }) => {
  const navigate = useNavigate()
  const tableRef = useRef<HTMLDivElement>(null)
  const isRawMaterialNeverPurchased = data._id !== ''
  const [offset, setOffset] = useState<number>(0)

  const { stockHistory } = useAppSelector(
    (state: RootState) => state.stockHistory
  )
  console.log(stockHistory)

  useGetStockHistoryQuery(
    {
      productId: data.product._id,
      limit: 7,
      offset,
    },
    {
      skip: !isRawMaterialNeverPurchased,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  )

  useEffect(() => {
    if (tableRef.current) {
      const { clientHeight, scrollHeight } = tableRef.current;
      console.log('Client Height:', clientHeight);
      console.log('Scroll Height:', scrollHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = tableRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 50 && offset < stockHistory.length) {
          setOffset((prevOffset) => prevOffset + 7);
        }
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    } else {
      console.warn('Table element is null, cannot attach scroll listener.');
    }

    return () => {
      tableElement?.removeEventListener('scroll', handleScroll);
    };
  }, [offset, stockHistory.length]);

  return (
    <div className='flex h-60 w-full flex-col gap-2 overflow-y-auto overflow-x-hidden'>
      <div className='my-3 text-center text-xs text-gray-400'>
        Recent Activities
      </div>
      <div ref={tableRef} className='overflow-y-auto h-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Status</TableHead>
              <TableHead className={`flex max-w-60 items-center gap-2`}>
                Trader
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
                  ? 'Regretfully, it was not salvaged'
                  : history.status === 'stock'
                    ? 'Processed into Ready Products'
                    : `Purchase from ${history.seller}`;

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
                  <TableCell
                    className={`${history.status === 'purchaseItem' ? 'text-green-700' : history.status === 'wastage' ? 'text-red-800/75' : 'text-amber-800/50'}`}
                  >
                    {remarks}
                  </TableCell>
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
              <TableCell className='text-right text-lg'>
                {data.qty} kg
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

export default PurchaseHistoryComponent;
