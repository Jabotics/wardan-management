import { FaPlus } from 'react-icons/fa'
import AllVariants from './all-variants'

const Variants = () => {
  return (
    <div className='flex h-[22vh] w-full flex-col rounded-2xl border border-indigo-300 bg-indigo-200/10'>
      <div className='flex h-10 items-center justify-center border-b border-indigo-300'>
        Variants
      </div>
      <div className='flex flex-1 items-center gap-5 overflow-x-auto overflow-y-hidden px-5'>
        <AllVariants />
      </div>
      <div className='flex h-10 items-center justify-end border-t border-indigo-100 px-5'>
        <div className='flex cursor-pointer items-center gap-1 rounded-lg bg-indigo-950 px-5 py-1 text-sm text-white hover:bg-opacity-80'>
          <FaPlus />
          <span>Add New Variant</span>
        </div>
      </div>
    </div>
  )
}

export default Variants