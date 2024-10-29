import { useNavigate } from 'react-router-dom'
import AllProducts from './all-products'
import { FaPlus } from 'react-icons/fa6'

const Products = () => {
  const navigate = useNavigate()
  return (
    <div className='flex h-[40vh] w-full flex-col rounded-2xl border border-indigo-300 bg-indigo-200/10'>
      <div className='flex h-10 items-center justify-center border-b border-indigo-300 text-xs'>
        Products
      </div>
      <div className='flex flex-1 items-start gap-5 overflow-y-auto overflow-x-hidden px-5 py-2'>
        <AllProducts />
      </div>
      <div className='flex h-10 items-center justify-end border-t border-indigo-100 px-5'>
        <div
          className='flex cursor-pointer items-center gap-1 rounded-lg bg-primary px-5 py-1 text-sm text-white hover:bg-opacity-80'
          onClick={() => {
            navigate(`/product`)
          }}
        >
          <FaPlus />
          <span className='text-xs'>Add New Product</span>
        </div>
      </div>
    </div>
  )
}

export default Products
