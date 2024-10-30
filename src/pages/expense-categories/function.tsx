import { Data } from './schema'
import { useState } from 'react'
import TableToolbarActions from '@/components/table/table-toolbar-actions'

import { useAppDispatch } from '@/store/hooks'
import { isErrorWithMessage } from '@/lib/utils'
import { toast } from 'sonner'
import { removeExpenseCategory, useRemoveExpenseCategoryMutation } from '@/store/actions/slices/expenseSlice'

export const ToolbarAction = ({ data }: { data: Data }) => {
  const dispatch = useAppDispatch()

  const [Delete] = useRemoveExpenseCategoryMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [deleteText, setDeleteText] = useState<string>('')

  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleDelete() {
    if (data && data._id) {
      setIsSubmitting(true)
      try {
        const res = await Delete({ id: data._id }).unwrap()

        toast(res.message)

        dispatch(removeExpenseCategory({ id: data._id }))
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
