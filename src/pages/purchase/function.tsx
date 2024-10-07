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
  const invoiceCharge =
    Number(data.total_amount) -
    (Number(data.transportation_charge) + Number(data.unloading_charge))
  return <>{'₹ ' + invoiceCharge}</>
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
              <div className='h-10 w-full bg-black'></div>
            </DrawerTrigger>

            <DrawerContent className='w-full h-[50%] bg-white absolute'>hey</DrawerContent>
          </Drawer>
        </DialogContent>
      </Dialog>
    </>
  )
}
