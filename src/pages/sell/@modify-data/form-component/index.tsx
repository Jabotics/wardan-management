import { ISell } from '@/interfaces'
import { Fragment } from 'react/jsx-runtime'
import { Cross2Icon } from '@radix-ui/react-icons'
import SellEntry from './sell-entry'

const FormComponent = ({
  data,
  setOpen
}: {
  data?: ISell
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isSubmitting?: boolean
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const toEdit = Boolean(data)

  return (
    <Fragment>
      <div
        onClick={() => setOpen(false)}
        className='absolute right-5 top-5 cursor-pointer'
      >
        <Cross2Icon className='h-4 w-4' />
      </div>

      <SellEntry setOpen={setOpen} toEdit={toEdit} data={data} />
    </Fragment>
  )
}

export default FormComponent
