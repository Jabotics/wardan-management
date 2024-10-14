import { transformString } from '@/lib/utils'
import { RootState } from '@/store'
import { useGetAllWastageQuery } from '@/store/actions/slices/wastageSlice'
import { useAppSelector } from '@/store/hooks'

const WastageCategory = () => {
  useGetAllWastageQuery({})
  const { wastageCategories } = useAppSelector(
    (state: RootState) => state.wastage
  )

  return (
    <div className='w-full flex-1 py-5'>
      {wastageCategories && wastageCategories.length > 0 ? (
        <div className='flex h-full items-center gap-3 overflow-x-auto overflow-y-hidden px-3'>
          {wastageCategories.map((item, index) => {
            return (
              <div
                key={index}
                className='flex h-full w-60 shrink-0 flex-col items-center justify-center rounded-3xl border border-indigo-300 bg-indigo-200'
              >
                <h4 className='text-xl'>{transformString(item)}</h4>
                <p className='cursor-pointer text-sm text-gray-500 underline'>
                  Check all details
                </p>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default WastageCategory
