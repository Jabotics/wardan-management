import { useState } from 'react'
import { Data } from './schema'
import TableToolbarActions from '@/components/table/table-toolbar-actions'
import { useResetRawMaterialStockMutation } from '@/store/actions/slices/rawStockSlice'
import { toFixedWithoutRounding } from '@/lib/utils'
import PurchaseHistoryComponent from './purchase-history'

import stockHistoryPNG from '@/assets/stock-history.png'
import { useNavigate } from 'react-router-dom'

export const Product = ({ data }: { data: Data }) => {
  return <>{data?.product?.name}</>
}

export const Quantity = ({ data }: { data: Data }) => {
  return (
    <span className='text-green-700'>{`${toFixedWithoutRounding(data.qty)} ${data.unit}`}</span>
  )
}

export const ToolbarAction = ({ data }: { data: Data }) => {
  const [Reset] = useResetRawMaterialStockMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [resetText, setResetText] = useState<string>('')

  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleReset() {
    if (data && data._id) {
      setIsSubmitting(true)
      try {
        const res = await Reset({ id: data._id }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)

        setDeleteOpen(false)
      } catch (error) {
        console.log(error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div
      className={`flex items-center justify-center gap-2 ${data.qty < 0 ? 'inline-block' : 'hidden'}`}
    >
      <TableToolbarActions
        text={resetText}
        setText={setResetText}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        label='Reset'
        handleReset={handleReset}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export const PurchaseHistory = ({ data }: { data: Data }) => {
  const navigate = useNavigate()
  const isRawMaterialNeverPurchased = data._id === ''

  if (isRawMaterialNeverPurchased) {
    return (
      <div className='relative h-20 w-full px-5'>
        <div className='absolute inset-0 flex items-center justify-center bg-gray-500/5 backdrop-blur-sm'>
          <div className='flex w-[40%] items-center justify-between xl:w-[65%]'>
            <span className='text-lg'>You have never purchased this item!</span>
            <span
              className='cursor-pointer bg-green-700 px-7 py-3 text-white'
              onClick={() => navigate('/purchase')}
            >
              Go to Purchase
            </span>
          </div>
        </div>
        <img
          src={stockHistoryPNG}
          alt='stock-history'
          className='h-full w-full object-cover'
        />
      </div>
    )
  }

  return <PurchaseHistoryComponent data={data} />
}
