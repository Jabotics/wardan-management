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
  return <>{data?.createdAt ? formatDateToIST(data.createdAt) : null}</>
}
