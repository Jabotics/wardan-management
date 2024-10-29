import { IPurchase } from '@/interfaces'
import { Fragment } from 'react/jsx-runtime'
import { HiMiniArrowLongRight } from 'react-icons/hi2'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import PurchaseEntry from './purchase-entry'

const FormComponent = ({
  data,
  setOpen,
}: {
  data?: Partial<IPurchase>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isSubmitting?: boolean
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const toEdit = Boolean(data)

  const [purchaseCategory, setPurchaseCategory] = useState<
    'Raw Material' | 'Packaging Material' | 'Other' | undefined
  >(undefined)
  const [toRedirect, setToRedirect] = useState(false)

  if (toEdit || (toRedirect && purchaseCategory)) {
    return (
      <Fragment>
        <div
          onClick={() => {
            setOpen(false);
          }}
          className='absolute right-5 top-5 cursor-pointer'
        >
          <Cross2Icon className='h-4 w-4' />
        </div>

        <PurchaseEntry
          category={purchaseCategory}
          setOpen={setOpen}
          toEdit={toEdit}
          data={data}
        />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div
        onClick={() => {
          setOpen(false)
          setPurchaseCategory(undefined)
        }}
        className='absolute right-5 top-5 cursor-pointer'
      >
        <Cross2Icon className='h-4 w-4' />
      </div>

      <p className='w-4/5 text-xs text-gray-700'>
        Enter the details for your purchase of raw materials, packaging
        materials, or other supplies. Select one of the following.
      </p>

      <div className='flex h-full w-full flex-col items-start justify-between'>
        <div className='flex w-full flex-1 flex-col gap-5 py-10'>
          {['Raw Material', 'Packaging Material', 'Other'].map(
            (item, index) => {
              return (
                <div
                  key={index}
                  className='flex cursor-pointer items-center justify-start gap-3 text-2xl'
                  onClick={() => {
                    if (
                      item === 'Raw Material' ||
                      item === 'Packaging Material' ||
                      item === 'Other'
                    ) {
                      setPurchaseCategory(item)
                    }
                  }}
                >
                  <div className='flex h-6 w-6 items-center justify-center rounded-full border border-black/40'>
                    {purchaseCategory === item ? (
                      <div className='h-3.5 w-3.5 rounded-full bg-black/85'></div>
                    ) : null}
                  </div>
                  <div>{item}</div>
                </div>
              )
            }
          )}
        </div>
        <div className='flex h-14 w-full items-center justify-end'>
          {purchaseCategory ? (
            <div
              onClick={() => setToRedirect(true)}
              className='flex w-fit cursor-pointer items-center gap-3 rounded-md bg-black px-10 py-2 text-white'
            >
              Next
              <HiMiniArrowLongRight />
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  )
}

export default FormComponent
