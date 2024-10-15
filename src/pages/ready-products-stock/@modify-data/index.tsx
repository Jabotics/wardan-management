import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import FormComponent from './form-component'
import { useState } from 'react'

const ModifyReadyProduct = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  return (
    <DialogContent className='flex h-fit w-[65vw] flex-col rounded-xl'>
      <div className='flex h-8 flex-col items-start justify-between'>
        <DialogTitle className='h-fit'>{`Add Ready Product`}</DialogTitle>
        <DialogDescription className='sr-only h-0'>
          Add / Edit dialog for Ready Product
        </DialogDescription>

        <div className='h-px w-3/4 bg-gray-400'></div>
      </div>

      <div className='w-full flex-1'>
        <FormComponent
          setOpen={setClose}
          toEdit={true}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </DialogContent>
  )
}

export default ModifyReadyProduct
