import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Data } from './schema'
import { RiAlignItemLeftLine } from 'react-icons/ri'
import { Tooltip } from '@mui/material'

import PurchaseItemsComponent from './purchase-item'
import { useState } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useRemovePurchaseMutation } from '@/store/actions/slices/purchaseSlice'
import TableToolbarActions from '@/components/table/table-toolbar-actions'
import FormComponent from './@modify-data/form-component'

export const Total = ({ data }: { data: Data }) => {
  return <>{'₹ ' + data.total_amount}</>
}

export const Transportation = ({ data }: { data: Data }) => {
  return <>{'₹ ' + data.transportation_charge}</>
}

export const Unloading = ({ data }: { data: Data }) => {
  return <>{'₹ ' + data.unloading_charge}</>
}

export const Invoice = ({ data }: { data: Data }) => {
  return <>{'₹ ' + data.invoice_amount}</>
}

export const Seller = ({ data }: { data: Data }) => {
  return (
    <Tooltip
      title={
        <div className='flex flex-col items-center justify-center gap-1 px-5 py-1'>
          <p className='font-medium'>{data.seller.name}</p>
          <p className='font-mono font-light tracking-wide'>
            {'GST no. ' + data.seller.gst_number}
          </p>
          <p className='text-xs'>{data.seller.address}</p>
        </div>
      }
      placement='top'
    >
      <div className='text-center underline'>{data.seller.name}</div>
    </Tooltip>
  )
}

export const PurchaseItems = ({ data }: { data: Data }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <div
            className='flex items-center justify-center'
            onClick={() => {
              setOpen(true)
            }}
          >
            <RiAlignItemLeftLine className='size-8 cursor-pointer border p-1' />
          </div>
        </DialogTrigger>
        <DialogContent className='flex h-[65vh] w-[65vw] flex-col bg-white'>
          <DialogTitle className='h-fit w-full'>Purchase Items</DialogTitle>
          <DialogDescription className='sr-only'>
            All the items purchased in this purchase
          </DialogDescription>
          <PurchaseItemsComponent purchaseId={data._id} setClose={setOpen} />

          <Drawer>
            <DrawerTrigger asChild>
              <div className='flex h-10 w-full cursor-pointer items-center justify-center bg-black text-white'>
                Add Another Item
              </div>
            </DrawerTrigger>

            <DrawerContent className='absolute h-[50%] w-full bg-white'>
              hey
            </DrawerContent>
          </Drawer>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const ToolbarAction = ({ data }: { data: Data }) => {
  const [Delete] = useRemovePurchaseMutation()

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
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </TableToolbarActions>

      <TableToolbarActions
        open={deleteOpen}
        setOpen={setDeleteOpen}
        label='Delete'
        handleDelete={handleDelete}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
