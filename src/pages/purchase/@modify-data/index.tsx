import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import FormComponent from './form-component'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'

const ModifyImporters = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { purchaseInfo } = useAppSelector((state: RootState) => state.purchase)

  return (
    <DialogContent className='flex h-[65vh] w-[65vw] flex-col rounded-xl'>
      <div className='flex h-8 flex-col items-start justify-between'>
        <DialogTitle className='h-fit'>{`New Purchase`}</DialogTitle>
        <DialogDescription className='sr-only h-0'>
          Add / Edit purchases
        </DialogDescription>

        <div className='h-px w-3/4 bg-gray-400'></div>
      </div>

      <div className='flex w-full flex-1 flex-col overflow-hidden'>
        <FormComponent data={purchaseInfo} setOpen={setClose} />
      </div>
    </DialogContent>
  )
}

export default ModifyImporters
