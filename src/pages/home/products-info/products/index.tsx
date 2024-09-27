import { useNavigate } from "react-router-dom";
import AllProducts from "./all-products"
import { FaPlus } from "react-icons/fa6";

const Products = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-[60vh] w-full flex-col rounded-2xl border border-rose-300 bg-rose-200/10'>
      <div className='flex h-10 items-center justify-center border-b border-rose-300'>
        Products
      </div>
      <div className='flex flex-1 items-start gap-5 overflow-hidden px-5 py-2'>
        <AllProducts />
      </div>
      <div className='flex h-10 items-center justify-end border-t border-indigo-100 px-5'>
        <div className='cursor-pointer rounded-lg bg-stone-950 px-5 py-1 text-sm text-white hover:bg-opacity-80 flex items-center gap-1' onClick={() => { navigate(`/product`) }}>
          <FaPlus />
          <span>Add New Product</span>
        </div>
      </div>
    </div>
  )
}

export default Products
