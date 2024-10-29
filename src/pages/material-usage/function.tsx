import { formatDateToIST } from "@/lib/utils"
import { Data } from "./schema"
import TableToolbarActions from "@/components/table/table-toolbar-actions"
import { useState } from "react"
import { useRemoveMaterialUsageMutation } from "@/store/actions/slices/materialUsageSlice"

export const CreatedAt = ({ data }: { data: Data }) => {
  return (
    <span className='whitespace-nowrap text-xs text-gray-400'>
      {data?.createdAt ? formatDateToIST(data.createdAt) : null}
    </span>
  )
}

export const Item = ({ data }: { data: Data }) => {
  return <span>{data?.items?.[0]?.product?.name || data?.items?.[0]?.material?.name}</span>
}

export const Quantity = ({ data }: { data: Data }) => {
  return <span>{data?.items?.[0]?.qty} kg</span>
}

export const ToolbarAction = ({ data }: { data: Data }) => {
  const [Delete] = useRemoveMaterialUsageMutation()

  const [deleteText, setDeleteText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleDelete() {
    if (data && data._id) {
      setIsSubmitting(true)
      try {
        if (deleteText === 'delete') {
          const res = await Delete({ id: data._id }).unwrap()

          if (res.status === 'fail') throw new Error(res.message)

          setDeleteOpen(false)
        }
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
        open={deleteOpen}
        setOpen={setDeleteOpen}
        label='Delete'
        handleDelete={handleDelete}
        isSubmitting={isSubmitting}
        text={deleteText}
        setText={setDeleteText}
      />
    </div>
  )
}