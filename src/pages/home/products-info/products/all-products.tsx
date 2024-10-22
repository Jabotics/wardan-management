import { RootState } from '@/store'
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'
import { useAppSelector } from '@/store/hooks'
import { MdRemoveRedEye } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const AllProducts = () => {
  const navigate = useNavigate()
  const { isLoading } = useGetProductsQuery({}, { refetchOnMountOrArgChange: true })
  const { products } = useAppSelector((state: RootState) => state.products)

  return (
    <div className='flex flex-1 w-full flex-col gap-3 overflow-y-auto overflow-x-hidden py-5 pr-3'>
      {!isLoading
        ? products?.map((item, index) => {
            return (
              <div
                key={index}
                className='flex h-16 w-full shrink-0 items-center justify-between rounded-xl border border-gray-200 bg-white/50 px-3 shadow-lg shadow-gray-100'
              >
                <div className='cursor-default'>
                  <div className='text-sm'>{item.name + ' Powder'}</div>
                  <div
                    className={`text-[10px] text-gray-500 ${item.type === 'MIXTURE' ? 'underline' : ''} ml-0.5 tracking-widest`}
                  >
                    {item.type + ' SPICE'}
                  </div>
                </div>
                <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-stone-200' onClick={() => { navigate(`/product?id=${item._id}`) }}>
                  <MdRemoveRedEye />
                </div>
              </div>
            )
          })
        : Array(5)
            .fill(null)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className='flex h-16 w-full shrink-0 items-center justify-between rounded-xl border border-gray-200 bg-gray-300 shadow-lg shadow-gray-100'
                >
                  <div className='h-full w-full animate-pulse rounded-lg bg-gray-200' />
                </div>
              )
            })}
    </div>
  )
}

export default AllProducts
