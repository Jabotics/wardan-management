import { Checkbox } from "@/components/ui/checkbox"

const TransactionTab = () => {
  console.log('first')
  return (
    <div className='h-full w-full'>
      <div className="flex items-center gap-5 w-full justify-start">
        <div className="text-sm flex items-center gap-2">
          <Checkbox />
          <span className="underline">To Pay</span>
        </div>
        <div className="text-sm flex items-center gap-2">
          <Checkbox />
          <span className="underline">To Receive</span>
        </div>
      </div>


      <div className="w-full h-full bg-black"></div>
    </div>
  )
}

export default TransactionTab