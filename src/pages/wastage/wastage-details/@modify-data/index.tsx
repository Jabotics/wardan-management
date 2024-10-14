import {
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import FormComponent from './form-component'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'


const ModifyWasteMaterial = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { wastageTablesShow } = useAppSelector((state: RootState) => state.app)
  return (
    <DialogContent className='flex h-[65vh] w-[65vw] flex-col rounded-xl'>
      <div className='flex h-8 flex-col items-start justify-between'>
        <DialogTitle className='h-fit'>{`Add Raw Materials Wastage`}</DialogTitle>
        <DialogDescription className='sr-only h-0'>
          Add dialog for waste material
        </DialogDescription>

        <div className='h-px w-3/4 bg-gray-400'></div>
      </div>

      <div className='w-full flex-1'>
        <FormComponent setOpen={setClose} toEdit={true} label={wastageTablesShow} />
      </div>
    </DialogContent>
  )
}

export default ModifyWasteMaterial
