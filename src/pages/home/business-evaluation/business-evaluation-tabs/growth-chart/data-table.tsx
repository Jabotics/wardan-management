import {
  useGetExpenseReportsQuery,
  useGetSellReportsQuery,
  useGetStockReportsQuery,
} from '@/store/actions/slices/reportsSlice'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { indianStyleAmount } from '@/lib/utils'

const DataTable = ({
  title,
  month,
  year,
}: {
  title: 'Expense' | 'Sell' | 'Stock'
  month: string
  year: number
}) => {
  useGetExpenseReportsQuery(
    { month, year },
    { skip: title !== 'Expense', refetchOnMountOrArgChange: true }
  )
  useGetSellReportsQuery(
    { month, year },
    { skip: title !== 'Sell', refetchOnMountOrArgChange: true }
  )
  useGetStockReportsQuery(
    { month, year },
    { skip: title !== 'Stock', refetchOnMountOrArgChange: true }
  )

  const { expense, sell, stock } = useAppSelector(
    (state: RootState) => state.reports
  )

  const totalExpenseAmount =
    expense?.expenses.reduce((total, item) => total + item.amount, 0) || 0
  const totalStockAmount = Array.isArray(stock)
    ? stock.reduce(
        (total, item) => total + (item?.count || 0) * (item?.c2c || 0),
        0
      )
    : 0

  const overallExpenseTotal =
    totalExpenseAmount +
    (expense?.otherMaterial || 0) +
    (expense?.packaging || 0) +
    (expense?.rawMaterial || 0)

  return (
    <div className='mt-5 h-full w-full overflow-x-hidden overflow-y-auto'>
      {title === 'Expense' ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-fit'>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expense && (
              <>
                <TableRow>
                  <TableCell className='cursor-pointer font-mono font-semibold'>
                    Raw Material
                  </TableCell>
                  <TableCell className='text-xs tracking-wider text-gray-500'>
                    N /A
                  </TableCell>
                  <TableCell className='text-right'>
                    ₹ {expense.rawMaterial}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cursor-pointer font-mono font-semibold'>
                    Packaging
                  </TableCell>
                  <TableCell className='text-xs tracking-wider text-gray-500'>
                    N /A
                  </TableCell>
                  <TableCell className='text-right'>
                    ₹ {expense.packaging}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cursor-pointer font-mono font-semibold'>
                    Other Materials
                  </TableCell>
                  <TableCell className='text-xs tracking-wider text-gray-500'>
                    N /A
                  </TableCell>
                  <TableCell className='text-right'>
                    ₹ {expense.otherMaterial}
                  </TableCell>
                </TableRow>
                {expense.expenses.length > 0 ? (
                  expense.expenses.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className='cursor-pointer font-mono font-semibold'>
                        Expense
                      </TableCell>
                      <TableCell className='text-xs tracking-wider text-gray-500'>
                        {item.category.name}
                      </TableCell>
                      <TableCell className='text-right'>
                        ₹ {item.amount}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className='cursor-pointer font-mono font-semibold'>
                      Expense
                    </TableCell>
                    <TableCell className='text-xs tracking-wider text-gray-500'>
                      N /A
                    </TableCell>
                    <TableCell className='text-right'>₹ 0</TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className='text-right text-lg text-green-600'>
                {indianStyleAmount(overallExpenseTotal)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : null}

      {title === 'Sell' ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-fit'>Status</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expense && (
              <>
                <TableRow>
                  <TableCell className='cursor-pointer font-mono font-semibold'>
                    Sell
                  </TableCell>
                  <TableCell className='text-right'>
                    ₹ {sell?.total_sell_amount || 0}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell className='text-right text-lg text-green-600'>
                {indianStyleAmount(sell?.total_sell_amount || 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : null}

      {title === 'Stock' ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-fit'>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className='text-right'>CTC Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stock && (
              <>
                {stock.length > 0 ? (
                  stock.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className='cursor-pointer font-mono font-semibold'>
                        {item?.product?.name || ''} ({item?.variant?.name || ''}
                        )
                      </TableCell>
                      <TableCell className='text-xs tracking-wider text-gray-500'>
                        {item?.qty || 0}kg ({item?.count || 0}pcs)
                      </TableCell>
                      <TableCell className='text-right'>
                        ₹ {(item?.c2c || 0) * (item?.count || 0)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      className='cursor-pointer font-mono font-semibold'
                      colSpan={3}
                    >
                      No Data Available
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
          {stock.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className='text-right text-lg text-green-600'>
                  {indianStyleAmount(totalStockAmount)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      ) : null}
    </div>
  )
}

export default DataTable
