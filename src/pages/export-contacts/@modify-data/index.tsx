import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import FormComponent from './form-component'
import { IBuyer } from '@/interfaces'
import { useState } from 'react'

const ModifyImporters = ({
  data,
  setClose,
}: {
  data?: IBuyer
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  return (
    <DialogContent className='flex h-[65vh] w-[65vw] flex-col rounded-xl'>
      <div className='flex h-8 flex-col items-start justify-between'>
        <DialogTitle className='h-fit'>{`Add Exporters`}</DialogTitle>
        <DialogDescription className='sr-only h-0'>
          Add / Edit dialog for exporters
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

export default ModifyImporters
