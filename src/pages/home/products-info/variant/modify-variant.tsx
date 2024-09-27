import { Checkbox } from '@/components/ui/checkbox'
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { IVariant } from '@/interfaces'
import { RootState } from '@/store'
import {
  addVariant,
  editVariant,
  useAddVariantMutation,
  useEditVariantMutation,
} from '@/store/actions/slices/variantsSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { Cross2Icon } from "@radix-ui/react-icons"

const ModifyVariant = ({
  variant,
  setOpen,
}: {
  variant?: IVariant
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch()

  const [Add] = useAddVariantMutation()
  const [Edit] = useEditVariantMutation()

  const [modifiedVariant, setModifiedVariant] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { products } = useAppSelector((state: RootState) => state.products)

  async function handleModifyVariant() {
    setIsSubmitting(true)

    try {
      if (variant) {
        const res = await Edit({
          _id: variant._id,
          name: modifiedVariant + 'gm',
        })

        if (res.data?.status === 'fail') throw new Error(res.data.message)

        dispatch(
          editVariant({
            id: variant._id,
            data: {
              _id: variant._id,
              name: modifiedVariant + 'gm',
              is_active: variant.is_active,
            },
          })
        )
      } else {
        const res = await Add({ name: modifiedVariant + 'gm' })

        if (res.data?.status === 'fail') throw new Error(res.data.message)

        dispatch(
          addVariant({ _id: '', name: modifiedVariant + 'gm', is_active: true })
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
    if (variant !== undefined) {
      setModifiedVariant(parseInt(variant.name, 10))
    }
  }, [variant])

  return (
    <Fragment>
      <div
        onClick={() => setOpen(false)}
        className='cursor-pointer absolute right-5 top-5'
      >
        <Cross2Icon className='h-4 w-4' />
      </div>
      <DialogTitle className='h-fit font-thin'>
        {variant !== undefined ? 'Edit Variant' : 'Add Variant'}
      </DialogTitle>
      <DialogDescription className='sr-only'>
        To Add or Edit Variant
      </DialogDescription>

      <div className='flex h-40 w-full flex-col'>
        <div className='flex h-8 w-full items-center justify-start gap-5'>
          <p>Variant : </p>
          <div className='flex items-center justify-center gap-2'>
            <Input
              type='number'
              value={modifiedVariant || ''}
              onChange={(e) => {
                setModifiedVariant(Number(e.target.value))
              }}
              className='h-8 w-20'
            />
            <p>gm</p>
          </div>
        </div>

        <div className='mt-10 flex w-full flex-wrap gap-5'>
          {products.map((item, index) => {
            return (
              <div key={index} className='flex items-center gap-2'>
                <Checkbox />
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      <DialogClose
        className='h-10 rounded-lg bg-primary text-white'
        disabled={isSubmitting}
        onClick={handleModifyVariant}
      >
        {isSubmitting ? 'Loading...' : 'Submit'}
      </DialogClose>
    </Fragment>
  )
}

export default ModifyVariant
