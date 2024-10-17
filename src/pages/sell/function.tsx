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

import SoldItemsComponent from './sold-item'
import { useState } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { formatDateToIST } from '@/lib/utils'
import TableToolbarActions from '@/components/table/table-toolbar-actions'
import { useRemoveSellMutation } from '@/store/actions/slices/exportSlice'
import FormComponent from './@modify-data/form-component'
import ModifySellItems from './sold-item/modify-sell-item'

export const TotalAmount = ({ data }: { data: Data }) => {
  return <>{'₹ ' + data.total_amount}</>
}

export const CreatedAt = ({ data }: { data: Data }) => {
  return <>{data?.createdAt ? formatDateToIST(data.createdAt) : null}</>
}

export const Buyer = ({ data }: { data: Data }) => {
  return (
    <Tooltip
      title={
        <div className='flex flex-col items-center justify-center gap-1 px-5 py-1'>
          <p className='font-medium'>{data?.buyer?.name}</p>
          <p className='font-mono font-light tracking-wide'>
            {'GST no. ' + data?.buyer?.gst_number}
          </p>
          <p className='text-xs'>{data?.buyer?.address}</p>
        </div>
      }
      placement='top'
    >
      <div className='text-center underline'>{data?.buyer?.name}</div>
    </Tooltip>
  )
}

export const SoldItems = ({ data }: { data: Data }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

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
          <DialogTitle className='h-fit w-full'>Sold Items</DialogTitle>
          <DialogDescription className='sr-only'>
            All the items sold in this event
          </DialogDescription>
          <SoldItemsComponent
            sellId={data._id}
            setClose={setOpen}
            totalAmount={data.total_amount}
            totalQty={data.total_qty}
          />

          <Drawer open={drawerOpen}>
            <DrawerTrigger asChild>
              <div
                className='flex h-10 w-full cursor-pointer items-center justify-center bg-black text-white'
                onClick={() => setDrawerOpen(true)}
              >
                Add Another Item
              </div>
            </DrawerTrigger>

            <DrawerContent className='absolute h-[50%] w-full bg-white'>
              <ModifySellItems setOpen={setDrawerOpen} sellId={data._id} />
            </DrawerContent>
          </Drawer>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const ToolbarAction = ({ data }: { data: Data }) => {
  const [Delete] = useRemoveSellMutation()

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
        deleteText={deleteText}
        setDeleteText={setDeleteText}
        label='Edit'
      >
        <FormComponent
          data={data}
          setOpen={setEditOpen}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </TableToolbarActions>

      <TableToolbarActions
        open={deleteOpen}
        deleteText={deleteText}
        setDeleteText={setDeleteText}
        setOpen={setDeleteOpen}
        label='Delete'
        handleDelete={handleDelete}
      />
    </div>
  )
}
