import { RootState } from '@/store'
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'
import { useAppSelector } from '@/store/hooks'
import { MdRemoveRedEye } from "react-icons/md";

const AllProducts = () => {
  const { isLoading } = useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

  return (
    <div className='flex h-full w-full flex-col gap-3 overflow-y-auto overflow-x-hidden py-5 pr-3'>
      {!isLoading
        ? products?.map((item, index) => {
            return (
              <div
                key={index}
                className='flex h-16 w-full shrink-0 items-center justify-between rounded-xl border border-gray-200 bg-white px-3 shadow-lg shadow-gray-100'
              >
                <div className='cursor-default'>
                  <div className='text-lg'>{item.name + ' Powder'}</div>
                  <div
                    className={`text-[10px] text-gray-500 ${item.type === 'MIXTURE' ? 'underline' : ''}`}
                  >
                    {item.type + ' SPICE'}
                  </div>
                </div>
                <div className='w-8 h-8 bg-stone-200 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer'>
                  <MdRemoveRedEye />
                </div>
              </div>
            )
          })
        : Array(5).fill(null).map((_, index) => {
          return (
            <div key={index} className='flex h-16 w-full shrink-0 items-center justify-between rounded-xl border border-gray-200 bg-white px-3 shadow-lg shadow-gray-100'></div>
          )
        })}
    </div>
  )
}

export default AllProducts
