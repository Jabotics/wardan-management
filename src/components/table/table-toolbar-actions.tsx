import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { MdEdit, MdDeleteOutline } from 'react-icons/md'
import { Button } from '../custom/button'
import { Input } from '../ui/input'

const TableToolbarActions = ({
  label,
  open,
  setOpen,
  children,
  handleDelete,
  isSubmitting,
  deleteText,
  setDeleteText
}: {
  label: 'Edit' | 'Delete'
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
  handleDelete?: () => Promise<void>
  isSubmitting?: boolean
  deleteText: string
  setDeleteText: React.Dispatch<React.SetStateAction<string>>
}) => {
  

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant={label === 'Edit' ? 'new_secondary' : 'outline'}
          onClick={() => setOpen(true)}
        >
          {label === 'Edit' ? (
            <MdEdit size={15} />
          ) : (
            <MdDeleteOutline size={15} />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          {label === 'Edit' ? 'Update Details' : 'Delete Details'}
        </DialogTitle>
        <Separator />
        <DialogDescription className='sr-only'>
          Table toolbar actions component
        </DialogDescription>

        {children ?? (
          <span className='mb-5 flex flex-col gap-1'>
            <span className='text-lg'>
              Are you sure, you want to delete this record?
            </span>
            <span className='text-sm text-gray-500'>
              If you are sure, type 'delete' then Confirm else Cancel.
            </span>
            <Input
              value={deleteText}
              onChange={(e) => {
                setDeleteText(e.target.value)
              }}
              className={`${deleteText.trim() === 'delete' ? 'border-black' : 'border-red-500'} h-6 w-fit outline-none`}
              style={{
                boxShadow: 'none',
                outline: 'none',
              }}
            />
          </span>
        )}

        <div className='flex items-center gap-2'>
          <DialogClose
            onClick={() => setOpen(false)}
            className={`w-full text-sm text-gray-400`}
            disabled={isSubmitting}
          >
            Cancel
          </DialogClose>
          <DialogClose
            onClick={() => {
              if (deleteText === 'delete') {
                handleDelete?.()
              }
            }}
            className={`w-full bg-gray-800 text-sm text-white ${label === 'Edit' ? 'hidden' : 'inline-block py-2'}`}
            disabled={isSubmitting}
          >
            Confirm
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TableToolbarActions
