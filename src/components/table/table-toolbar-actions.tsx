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

const TableToolbarActions = ({
  label,
  open,
  setOpen,
  children,
  handleDelete,
  isSubmitting
}: {
  label: 'Edit' | 'Delete'
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
  handleDelete?: () => Promise<void>
  isSubmitting?: boolean
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
        <DialogDescription className='sr-only'>Table toolbar actions component</DialogDescription>

        {children ?? (
          <span className='mb-5 flex flex-col gap-1'>
            <span className='text-lg'>
              Are you sure, you want to delete this record?
            </span>
            <span className='text-sm text-gray-500'>
              If you are sure, Confirm else Cancel.
            </span>
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
            onClick={handleDelete}
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
