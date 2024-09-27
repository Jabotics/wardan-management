import {
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

import FormComponent from './form-component'
import { ISeller } from '@/interfaces'

const ModifyImporters = ({
  data,
  setClose,
}: {
  data?: ISeller
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <DialogContent className='flex h-[65vh] w-[65vw] flex-col rounded-xl'>
      <div className='flex h-8 flex-col items-start justify-between'>
        <DialogTitle className='h-fit'>{`Add Importers`}</DialogTitle>
        <DialogDescription className='sr-only h-0'>
          Add / Edit dialog for importers
        </DialogDescription>

        <div className='h-px w-3/4 bg-gray-400'></div>
      </div>

      <div className='w-full flex-1'>
        <FormComponent data={data} setOpen={setClose} toEdit={true} />
      </div>
    </DialogContent>
  )
}

export default ModifyImporters
