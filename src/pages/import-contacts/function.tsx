import { Data } from './schema'
import { useState } from 'react'
import TableToolbarActions from '@/components/table/table-toolbar-actions'
import FormComponent from './@modify-data/form-component'
import { useRemoveImporterMutation } from '@/store/actions/slices/importersSlice'

export const Address = ({ data }: { data: Data }) => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <span className='w-[400px] text-xs'>{data.address}</span>
    </div>
  )
}

export const GSTNumber = ({ data }: { data: Data }) => {
  return <>{data.gst_number}</>
}

export const ToolbarAction = ({ data }: { data: Data }) => {
  const [Delete] = useRemoveImporterMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  async function handleDelete() {
    if (data && data._id) {
      setIsSubmitting(true)
      try {
        const res = await Delete({ id: data._id }).unwrap()

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
    <div className='flex items-center justify-center gap-2'>
      <TableToolbarActions open={editOpen} setOpen={setEditOpen} label='Edit'>
        <FormComponent
          data={data}
          setOpen={setEditOpen}
          toEdit={true}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </TableToolbarActions>

      <TableToolbarActions
        open={deleteOpen}
        setOpen={setDeleteOpen}
        label='Delete'
        handleDelete={handleDelete}
      />
    </div>
  )
}
