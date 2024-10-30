import { Data } from './schema'
import { useState } from 'react'
import TableToolbarActions from '@/components/table/table-toolbar-actions'

import { isErrorWithMessage } from '@/lib/utils'
import { toast } from 'sonner'
import { useRemoveExpenseMutation } from '@/store/actions/slices/expenseSlice'

export const Category = ({ data }: { data: Data }) => {
  return (
    <span>{data.category.name}</span>
  )
}

export const Amount = ({data}: {data: Data}) => {
  return (
    <span>₹ {data.amount}</span>
  )
}

export const Month = ({data}: {data: Data}) => {
  return (
    <span>{data.month},{' '}{data.year}</span>
  )
}

export const ToolbarAction = ({ data }: { data: Data }) => {

  const [Delete] = useRemoveExpenseMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [deleteText, setDeleteText] = useState<string>('')

  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleDelete() {
    if (data && data._id) {
      setIsSubmitting(true)
      try {
        const res = await Delete({ id: data._id }).unwrap()

        toast(res.message)

        setDeleteOpen(false)
      } catch (error) {
        if (isErrorWithMessage(error)) {
          toast(error.data.message)
        } else {
          toast('An unexpected error occurred')
        }
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
