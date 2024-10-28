import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import FormComponent from './form-component'
import { IPayment } from '@/interfaces'
import { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'

const ModifyAssets = ({
  data,
  setClose,
}: {
  data?: IPayment
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  return (
    <DialogContent className='flex h-fit w-[65vw] flex-col rounded-xl'>
      <div
        onClick={() => setClose(false)}
        className='absolute right-5 top-5 cursor-pointer'
      >
        <Cross2Icon className='h-4 w-4' />
      </div>
      <div className='flex h-8 flex-col items-start justify-between'>
        <DialogTitle className='h-fit'>{`Add a Payment`}</DialogTitle>
        <DialogDescription className='sr-only h-0'>
          Add / Edit dialog for payments
        </DialogDescription>

        <div className='h-px w-3/4 bg-gray-400'></div>
      </div>

      <div className='w-full flex-1'>
        <FormComponent
          data={data}
          setOpen={setClose}
          toEdit={true}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </DialogContent>
  )
}

export default ModifyAssets
