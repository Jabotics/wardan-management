import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { IOtherMaterial } from '@/interfaces'
import {
  addMaterial,
  editMaterial,
  removeMaterial,
  useAddMaterialMutation,
  useEditMaterialMutation,
  useRemoveMaterialMutation,
} from '@/store/actions/slices/otherMaterialsSlice'
import { useAppDispatch } from '@/store/hooks'
import { useEffect, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

const ModifyOtherMaterial = ({
  material,
  setOpen,
}: {
  material?: IOtherMaterial
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch()

  const [Add] = useAddMaterialMutation()
  const [Edit] = useEditMaterialMutation()
  const [Delete] = useRemoveMaterialMutation()

  const [modifiedMaterial, setModifiedMaterial] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  async function handleDeleteMaterial() {
    if (material && material._id) {
      setIsSubmitting(true)
      console.log('first')

      try {
        const res = await Delete({ id: material._id }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)

        dispatch(removeMaterial({ id: material._id }))
        setOpen(false)
      } catch (error) {
        console.log(error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  async function handleModifyMaterial() {
    setIsSubmitting(true)

    try {
      if (material) {
        const res = await Edit({
          _id: material._id,
          name: modifiedMaterial,
        }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)

        dispatch(
          editMaterial({
            id: material._id,
            data: {
              _id: material._id,
              name: modifiedMaterial,
              is_active: material.is_active ?? true,
            },
          })
        )
      } else {
        const res: { data: { _id: string }; status: string; message: string } =
          await Add({ name: modifiedMaterial }).unwrap()

        if (res.status === 'fail') throw new Error(res.message)

        const newId = res.data?._id
        dispatch(
          addMaterial({
            _id: newId,
            name: modifiedMaterial,
            is_active: true,
          })
        )
      }

      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (material !== undefined) {
      console.log(material)
      setModifiedMaterial(material.name)
    }
  }, [material])

  return (
    <Fragment>
      <div
        onClick={() => setOpen(false)}
        className='absolute right-5 top-5 cursor-pointer'
      >
        <Cross2Icon className='h-4 w-4' />
      </div>
      <DialogTitle className='h-fit font-thin'>
        {material !== undefined ? 'Edit Material' : 'Add Material'}
      </DialogTitle>
      <DialogDescription className='sr-only'>
        To Add or Edit Other Material
      </DialogDescription>

      <div className='mt-5 flex h-40 w-full flex-col'>
        <div className='flex h-fit w-full flex-col items-start justify-start'>
          <p>Material : </p>
          <Input
            type='text'
            value={modifiedMaterial}
            onChange={(e) => {
              const value = e.target.value
              setModifiedMaterial(value === '' ? '' : value)
            }}
            className='mt-3 h-10 w-full placeholder:text-slate-400'
            placeholder='Add a Material'
          />
        </div>
      </div>

      <div className='flex items-center justify-end gap-3'>
        {material ? (
          <Button
            variant={'destructive'}
            className='h-10 w-1/2'
            disabled={isSubmitting}
            onClick={handleDeleteMaterial}
          >
            Remove
          </Button>
        ) : null}
        <DialogClose
          className='h-10 w-1/2 rounded-lg border border-primary bg-transparent text-primary'
          disabled={isSubmitting}
          onClick={handleModifyMaterial}
        >
          Submit
        </DialogClose>
      </div>
    </Fragment>
  )
}

export default ModifyOtherMaterial
