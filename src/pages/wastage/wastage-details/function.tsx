import { formatDateToIST } from '@/lib/utils'
import { Data } from './schema'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useRemoveWastageMutation } from '@/store/actions/slices/wastageSlice'
import TableToolbarActions from '@/components/table/table-toolbar-actions'

export const Product = ({ data }: { data: Data }) => {
  const items = data?.items || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (items.length === 0) return <></>

  const handleOpen = (index: number) => {
    setOpenIndex(index)
  }

  const handleClose = () => {
    setOpenIndex(null)
  }

  return (
    <>
      {items.map((item, index) => (
        <span
          key={index}
          className='cursor-pointer underline'
          onClick={() => handleOpen(index)}
        >
          {item?.product?.name}
          {index < items.length - 1 && <span>, </span>}
        </span>
      ))}

      {openIndex !== null && (
        <Dialog open>
          <DialogContent>
            <DialogTitle>Items</DialogTitle>
            <Separator />
            <div className='h-[40vh] w-full overflow-y-auto overflow-x-hidden flex flex-col gap-2'>
              {items.map((item, index) => (
                <div key={index} className=' bg-amber-800/20 text-black px-5 py-3 rounded-xl'>
                  {`${item.product.name} : ${item.qty} ${item.unit}`}
                </div>
              ))}
            </div>
            <DialogClose onClick={handleClose}>Close</DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export const CreatedAt = ({ data }: { data: Data }) => {
  return <span className='text-xs text-gray-400'>{data?.createdAt ? formatDateToIST(data.createdAt) : null}</span>
}

export const Quantity = ({ data }: { data: Data }) => {
  const totalWastage = data.items.reduce((total, item) => total + item.qty, 0);
  return <>{totalWastage ?? 0} kg</>
}

export const ToolbarAction = ({ data }: { data: Data }) => {
  // const dispatch = useAppDispatch()

  const [Delete] = useRemoveWastageMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [deleteText, setDeleteText] = useState<string>('')

  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleDelete() {
    if (data && data._id) {
      setIsSubmitting(true)
      try {
        const res = await Delete({ id: data._id }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)

        // dispatch(removeReadyProduct({ id: data._id }))
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
