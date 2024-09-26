import { RootState } from '@/store'
import { useGetAllVariantsQuery } from '@/store/actions/slices/variantsSlice'
import { useAppSelector } from '@/store/hooks'

const AllVariants = () => {
  const { isLoading } = useGetAllVariantsQuery({})
  const { variants } = useAppSelector((state: RootState) => state.variants)

  return (
    <>
      {!isLoading
        ? variants?.map((item, index) => {
            return (
              <div
                key={index}
                className='flex aspect-[2/1] h-3/5 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white/50 text-indigo-950 shadow-lg shadow-gray-100 cursor-pointer'
              >
                <p>{item.name}</p>
                <p className='text-xs text-gray-500'>4 Products</p>
              </div>
            )
          })
        : Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className='flex aspect-[2/1] h-3/5 flex-col items-center justify-center rounded-2xl bg-gray-300'
              >
                <div className='h-full w-full animate-pulse rounded-lg bg-gray-200' />
              </div>
            ))}
    </>
  )
}

export default AllVariants
