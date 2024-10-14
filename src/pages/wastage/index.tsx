import { FaPlus } from 'react-icons/fa'
import WastageCategory from './wastage-category'
import WastageDetails from './wastage-details'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { useRef, useEffect, useState } from 'react'

const WastagePage = () => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  const { wastageTablesShow } = useAppSelector((state: RootState) => state.app)
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    if (shouldScroll && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setShouldScroll(false) 
    }
  }, [shouldScroll])

  return (
    <div className='h-[90vh] w-full rounded-3xl'>
      <div className='flex h-full w-full flex-col gap-5 overflow-y-auto overflow-x-hidden'>
        <div className='flex h-[40vh] w-full shrink-0 flex-row items-center justify-between'>
          <div className='h-full w-1/2 p-2'>
            <div className='flex h-full flex-col rounded-3xl border border-indigo-300 bg-indigo-200/10 py-3'>
              <h2 className='w-full border border-transparent border-b-indigo-300 px-3'>
                All Wastage Category
              </h2>

              <WastageCategory
                setShouldScroll={setShouldScroll}
                ref={tableRef}
              />

              <div className='flex h-16 items-center justify-end border border-transparent border-t-indigo-300 px-3'>
                <div className='flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-10 py-1 text-white'>
                  <FaPlus />
                  Add New Category
                </div>
              </div>
            </div>
          </div>
          <div className='h-full w-1/2 p-2'></div>
        </div>

        {wastageTablesShow ? (
          <div className='h-fit w-full p-2' ref={tableRef}>
            <WastageDetails />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default WastagePage
