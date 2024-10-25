import { TransactionTable } from './transaction-table'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { RootState } from '@/store'
import { setSelectedTable } from '@/store/actions/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const TransactionTab = () => {
  const dispatch = useAppDispatch()
  const { selectedTable } = useAppSelector((state: RootState) => state.app)

  return (
    <div className='h-full w-full'>
      <RadioGroup
        defaultValue={selectedTable}
        className='flex items-center gap-5'
      >
        <div
          className='flex cursor-pointer items-center space-x-2'
          onClick={() => dispatch(setSelectedTable('to-pay'))}
        >
          <RadioGroupItem
            value='to-pay'
            id='to-pay'
            checked={selectedTable === 'to-pay'}
          />
          <Label htmlFor='to-pay'>To Pay</Label>
        </div>
        <div
          className='flex cursor-pointer items-center space-x-2'
          onClick={() => dispatch(setSelectedTable('to-receive'))}
        >
          <RadioGroupItem
            value='to-receive'
            id='to-receive'
            checked={selectedTable === 'to-receive'}
          />
          <Label htmlFor='to-receive'>To Receive</Label>
        </div>
      </RadioGroup>

      <div className='h-full w-full pt-3'>
        <TransactionTable />
      </div>
    </div>
  )
}

export default TransactionTab
