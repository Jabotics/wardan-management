import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import FormComponent from './form-component'

const ModifySell = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  return (
    <DialogContent className='flex h-fit max-h-[65vh] w-[65vw] flex-col rounded-xl'>
      <div className='flex h-8 flex-col items-start justify-between'>
        <DialogTitle className='h-fit'>{`New Sell`}</DialogTitle>
        <DialogDescription className='sr-only h-0'>
          Add New Sell
        </DialogDescription>

        <div className='h-px w-3/4 bg-gray-400'></div>
      </div>

      <div className='flex w-full flex-1 flex-col overflow-hidden'>
        <FormComponent setOpen={setClose} />
      </div>
    </DialogContent>
  )
}

export default ModifySell
