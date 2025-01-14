import { FaPlus } from 'react-icons/fa'
import AllVariants from './all-variants'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ModifyVariant from './modify-variant'
import { useState } from 'react'

const Variants = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='flex h-[22vh] w-full flex-col rounded-2xl border border-indigo-300 bg-indigo-200/10'>
      <div className='flex h-10 items-center justify-center border-b border-indigo-300 text-xs'>
        Variants
      </div>
      <div className='flex flex-1 items-center gap-5 overflow-x-auto overflow-y-hidden px-5'>
        <AllVariants />
      </div>
      <div className='flex h-10 items-center justify-end border-t border-indigo-100 px-5'>
        <Dialog open={open}>
          <DialogTrigger asChild onClick={() => { setOpen(true) }}>
            <div className='flex cursor-pointer items-center gap-1 rounded-lg bg-primary px-5 py-1 text-sm text-white hover:bg-opacity-80'>
              <FaPlus />
              <span className="text-xs">Add New Variant</span>
            </div>
          </DialogTrigger>
          <DialogContent className='h-fit w-[65vw] bg-white'>
            <ModifyVariant setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Variants
