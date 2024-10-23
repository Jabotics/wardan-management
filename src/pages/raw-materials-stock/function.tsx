import { useState } from 'react'
import { Data } from './schema'
import TableToolbarActions from '@/components/table/table-toolbar-actions'
import { useResetRawMaterialStockMutation } from '@/store/actions/slices/rawStockSlice'
import { toFixedWithoutRounding } from '@/lib/utils'
import PurchaseHistoryComponent from './purchase-history'

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
  const isRawMaterialNeverPurchased = data._id === ''

  if (isRawMaterialNeverPurchased) {
    return <div className='h-20 w-full'></div>
  }

  return <PurchaseHistoryComponent data={data} />
}
