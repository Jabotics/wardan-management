import { useState } from 'react'
import { Data } from './schema'
import TableToolbarActions from '@/components/table/table-toolbar-actions'
import { useRemovePaymentMutation } from '@/store/actions/slices/paymentSlice'
import FormComponent from './@modify-data/form-component'
import { formatDateToIST } from '@/lib/utils'

export const Amount = ({ data }: { data: Data }) => {
  return <>{`₹ ${data?.amount}`}</>
}

export const Seller = ({ data }: { data: Data }) => {
  return <>{`${data?.seller?.name}`}</>
}

export const Remarks = ({ data }: { data: Data }) => {
  const remarks = data?.remarks || '';
  const isLong = remarks.length > 40;

  if (data?.remarks === '') return <span className='text-gray-400 font-semibold'>NO REMARKS</span>

  return (
    <span className='text-xs text-gray-400'>
      {isLong ? `${remarks.substring(0, 40)}...` : remarks}
    </span>
  );
};


export const CreatedAt = ({ data }: { data: Data }): JSX.Element => {
  return <>{data?.createdAt ? formatDateToIST(data.createdAt) : null}</>
}

export const ToolbarAction = ({ data }: { data: Data }) => {

  const [Delete] = useRemovePaymentMutation()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [deleteText, setDeleteText] = useState<string>('')

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
      <TableToolbarActions
        open={editOpen}
        setOpen={setEditOpen}
        label='Edit'
        text={deleteText}
        setText={setDeleteText}
      >
        <FormComponent
          data={data}
          setOpen={setEditOpen}
          toEdit={true}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </TableToolbarActions>

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

