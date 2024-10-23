import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import FormComponent from './form-component'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { useState } from 'react'
import { transformString } from '@/lib/utils'
import { Cross2Icon } from '@radix-ui/react-icons'

const ModifyWasteMaterial = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [label, setLabel] = useState<'RAW_MATERIAL' | null>(null)

  return (
    <DialogContent className='flex h-[65vh] w-[65vw] flex-col rounded-xl'>
      <div
        onClick={() => setClose(false)}
        className='absolute right-5 top-5 cursor-pointer'
      >
        <Cross2Icon className='h-4 w-4' />
      </div>

      <div className='flex h-8 flex-col items-start justify-between'>
        <DialogTitle className='h-fit'>{`Add Wastage`}</DialogTitle>
        <DialogDescription className='sr-only h-0'>
          Add dialog for waste material
        </DialogDescription>

        <Separator />
      </div>

      <Select
        onValueChange={(val: string) => {
          setLabel(val === 'RAW_MATERIAL' ? 'RAW_MATERIAL' : null)
        }}
        value={label ?? ''}
      >
        <SelectTrigger>
          {label ? transformString(label) : 'Select a Category'}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'RAW_MATERIAL'}>Raw Material</SelectItem>
        </SelectContent>
      </Select>

      <div className='w-full flex-1'>
        <FormComponent setOpen={setClose} toEdit={true} label={label} />
      </div>
    </DialogContent>
  )
}

export default ModifyWasteMaterial
