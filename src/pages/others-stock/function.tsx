import { Data } from './schema'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { Input } from '@/components/ui/input'
import {
  useEffect,
} from 'react'
import {
  resetEditPackagingAndOther,
  setEditPackagingAndOther,
  setNewQty,
  useUpdatePackagingOrOtherStockMutation,
} from '@/store/actions/slices/rawStockSlice'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { Button } from '@/components/custom/button'
import { toast } from 'sonner'
import { isErrorWithMessage } from '@/lib/utils'

export const Material = ({ data }: { data: Data }) => {
  return <>{data?.material?.name}</>
}

export const Quantity = ({ data }: { data: Data }) => {
  const dispatch = useAppDispatch()

  const { newQty: qty } = useAppSelector((state: RootState) => state.rawStocks)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditPackagingAndOther())
    dispatch(setNewQty(Number(e.target.value)))

    if (Number(e.target.value) === data.qty) {
      dispatch(resetEditPackagingAndOther())
    }
  }

  const dynamicWidth = `${Math.max(3.2, String(qty).length * 1)}rem`

  useEffect(() => {
    dispatch(setNewQty(data?.qty ?? 0))
  }, [data?.qty, dispatch])

  return (
    <div className='flex items-center justify-center gap-5'>
      <FaPlusCircle
        size={20}
        className={`${qty < data.qty ? 'cursor-pointer text-emerald-600' : 'cursor-not-allowed text-emerald-600/45'}`}
        onClick={() => {
          dispatch(setEditPackagingAndOther())
          if (qty < data.qty) {
            dispatch(setNewQty(qty + 1))
          }
        }}
      />
      <div className='flex items-center justify-center gap-0 text-stone-900'>
        <Input
          value={qty}
          onChange={handleChange}
          className='border-none outline-none'
          style={{
            width: dynamicWidth,
            outline: 'none',
            boxShadow: 'none',
          }}
        />{' '}
        kg
      </div>
      <FaMinusCircle
        size={20}
        className='cursor-pointer text-emerald-600'
        onClick={() => {
          dispatch(setEditPackagingAndOther())
          dispatch(setNewQty(qty - 1))
        }}
      />
    </div>
  )
}

export const SaveOrCancel = ({ data }: { data: Data }) => {
  const dispatch = useAppDispatch()
  const [Update] = useUpdatePackagingOrOtherStockMutation({})

  const { toEditPackagingAndOther, newQty } = useAppSelector(
    (state: RootState) => state.rawStocks
  )

  const handleSubmit = async () => {
    try {
      const res = await Update({
        category: 'OTHER',
        items: [
          {
            material: data?.material?._id ?? '',
            qty: data?.qty - newQty,
          },
        ],
      }).unwrap()

      toast(res.message)
      dispatch(resetEditPackagingAndOther())
    } catch (error) {
      if (isErrorWithMessage(error)) {
        toast(error.data.message)
      } else {
        toast('An unexpected error occurred')
      }
    }
  }

  return (
    <div className='w-20 max-w-20'>
      {toEditPackagingAndOther ? (
        <div className='flex items-center justify-center gap-3'>
          <Button
            type='button'
            variant={'new_secondary'}
            className='h-8 text-white'
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            type='button'
            variant={'secondary'}
            className='h-8'
            onClick={() => {
              dispatch(setNewQty(data?.qty ?? 0))
              dispatch(resetEditPackagingAndOther())
            }}
          >
            Cancel
          </Button>
        </div>
      ) : null}
    </div>
  )
}