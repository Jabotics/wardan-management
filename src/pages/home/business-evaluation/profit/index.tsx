import { FaArrowUpLong } from "react-icons/fa6";

const Profit = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center rounded-2xl border-[1px] border-primary/65 bg-primary/5'>
      <div className="h-8 w-full flex items-center justify-center border-b border-primary">Profit</div>
      <div className="flex-1 flex w-full items-center justify-center gap-2">
        <FaArrowUpLong size={40} className="text-primary" />
        <h1 className="text-6xl text-indigo-800">12<span className="text-primary">%</span></h1>
      </div>
      <div className="w-full h-24 border-t border-primary/15"></div>
    </div>
  )
}

export default Profit
