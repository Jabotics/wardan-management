import { Data } from './schema'
import { useState } from 'react'
import TableToolbarActions from '@/components/table/table-toolbar-actions'

import {
  removeReadyProduct,
  useRemoveReadyProductMutation,
} from '@/store/actions/slices/readyProductStockSlice'
import { useAppDispatch } from '@/store/hooks'
import { formatDateToIST } from '@/lib/utils'

export const Product = ({ data }: { data: Data }) => {
  return <>{data?.product?.name}</>
}

export const Quantity = ({ data }: { data: Data }) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <span className='text-green-600'>{`${Math.round(Number(data.qty))} ${data.unit} `}</span>{' '}
      <span className='text-green-700'>{`(${data.count} pieces)`}</span>
    </div>
  )
}

export const Variant = ({ data }: { data: Data }) => {
  return (
    <span className='rounded-md bg-gray-400 px-3 py-1'>{`${data.variant.name}`}</span>
  )
}

export const Price = ({ data }: { data: Data }) => {
  return <span className='text-sm text-[#9F3D47]'>{`₹${data.mrp} (CTC: ₹${data.c2c})`}</span>
}

export const LastUpdated = ({ data }: { data: Data }) => {
  return (
    <span className='w-fit text-xs text-gray-400'>
      {data?.updatedAt ? formatDateToIST(data?.updatedAt) : null}
    </span>
  )
}

export const ToolbarAction = ({ data }: { data: Data }) => {
  const dispatch = useAppDispatch()

  const [Delete] = useRemoveReadyProductMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [deleteText, setDeleteText] = useState<string>('')

  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleDelete() {
    if (data && data._id) {
      setIsSubmitting(true)
      try {
        const res = await Delete({ id: data._id }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)

        dispatch(removeReadyProduct({ id: data._id }))
        setDeleteOpen(false)
      } catch (error) {
        console.log(error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className='flex items-center justify-center gap-2'>
      <TableToolbarActions
        text={deleteText}
        setText={setDeleteText}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        label='Delete'
        handleDelete={handleDelete}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
