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
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { formatDateToIST, isErrorWithMessage } from '@/lib/utils'
import TableToolbarActions from '@/components/table/table-toolbar-actions'
import {
  // useGenerateInvoiceQuery,
  useRemoveSellMutation,
} from '@/store/actions/slices/exportSlice'
import FormComponent from './@modify-data/form-component'
import ModifySellItems from './sold-item/modify-sell-item'
import { APIEndPoints } from '@/APIEndpoints'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export const TotalAmount = ({ data }: { data: Data }) => {
  return <span className='text-green-800'>{'₹ ' + data.total_amount}</span>
}

export const Invoice = ({ data }: { data: Data }) => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickInvoice = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const pdfUrl = `${APIEndPoints.BackendURL}/${APIEndPoints.generate_sell_invoice}/${data?._id}`

      const newTab = window.open(pdfUrl, '_blank')
      if (newTab) {
        newTab.document.title = `invoice_${data?.invoice_no}.pdf`
      }

      setIsLoading(false)
    } catch (err) {
      console.error('Error generating invoice:', err)
      setError('Error generating invoice')
      setIsLoading(false)
    }
  }

  return (
    <span onClick={handleClickInvoice} className='text-[#9F3D47] underline'>
      {isLoading ? 'Generating...' : data?.invoice_no}
      {error && <span className='error-message'>{error}</span>}
    </span>
  )
}

export const CreatedAt = ({ data }: { data: Data }) => {
  return (
    <span className='text-xs text-gray-400'>
      {data?.createdAt ? formatDateToIST(data.createdAt) : null}
    </span>
  )
}

export const Buyer = ({ data }: { data: Data }) => {
  return (
    <Tooltip
      title={
        <div className='flex flex-col items-center justify-center gap-1 bg-white px-5 py-1'>
          <p className='font-medium text-black'>{data?.buyer?.name}</p>
          <p className='font-mono font-light tracking-wide text-black'>
            {'GST no. ' + data?.buyer?.gst_number}
          </p>
          <p className='text-xs text-black'>{data?.buyer?.address}</p>
        </div>
      }
      placement='top'
    >
      <Link to={'/export-contacts'} className='text-center underline'>
        {data?.buyer?.name}
      </Link>
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
              <DrawerTitle className='text-center'>Add Sold Item</DrawerTitle>
              <DrawerDescription className='sr-only'>
                Add Sold Item
              </DrawerDescription>
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
        open={editOpen}
        setOpen={setEditOpen}
        text={deleteText}
        setText={setDeleteText}
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
        text={deleteText}
        setText={setDeleteText}
        setOpen={setDeleteOpen}
        label='Delete'
        handleDelete={handleDelete}
      />
    </div>
  )
}
