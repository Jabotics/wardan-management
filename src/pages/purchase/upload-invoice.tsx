import {
  deleteInvoiceImages,
  useRemoveInvoiceMutation,
  useUploadInvoiceMutation,
} from '@/store/actions/slices/purchaseSlice'
import { Data } from './schema'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { IoEyeSharp } from 'react-icons/io5'
import { Separator } from '@/components/ui/separator'
import { APIEndPoints } from '@/APIEndpoints'
import { FaPlus } from 'react-icons/fa'
import { useAppDispatch } from '@/store/hooks'

export const UploadInvoiceComponent = ({ data }: { data: Data }) => {
  const dispatch = useAppDispatch()

  const [uploadInvoice] = useUploadInvoiceMutation()
  const [removeInvoice] = useRemoveInvoiceMutation()

  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [recentImage, setRecentImage] = useState<string | null>(null)
  const [imageToShow, setImageToShow] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(1)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
      setSuccess(false)
      setRecentImage(null)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('invoice', selectedFile)
    formData.append('_id', data._id)

    setLoading(true)
    setError(null)

    try {
      await uploadInvoice(formData).unwrap()
      const blobUrl = URL.createObjectURL(selectedFile)
      setRecentImage(blobUrl)

      setTimeout(() => {
        setSuccess(true)
      }, 2000)

      setSelectedFile(null)
    } catch (error) {
      console.error('Upload failed', error)
      setError('Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    const zoomChange = event.deltaY < 0 ? 0.1 : -0.1
    setZoomLevel((prev) => Math.max(0.1, prev + zoomChange))
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    url: string
  ) => {
    e.stopPropagation()
    try {
      if (url !== recentImage) {
        const res = await removeInvoice({
          purchaseId: id,
          invoice_url: url,
        })

        if (res.error) throw new Error('Something went wrong')
      }

      dispatch(deleteInvoiceImages({ id, url }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Dialog open={Boolean(imageToShow)}>
        <DialogContent className='h-screen w-full py-10' onWheel={handleWheel}>
          <div
            onClick={() => {
              setImageToShow(null)
              setZoomLevel(1)
            }}
            className='absolute right-5 top-5 cursor-pointer'
          >
            <Cross2Icon className='h-4 w-4' />
          </div>

          <div className='h-full w-full overflow-auto'>
            {imageToShow ? (
              <img
                src={imageToShow}
                alt=''
                className='h-full w-full object-contain'
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.2s',
                }}
              />
            ) : (
              'loading...'
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open}>
        <DialogTrigger asChild>
          <div
            className='flex items-center justify-center border px-5 py-3'
            onClick={() => {
              setOpen(true)
            }}
          >
            {Array.isArray(data?.invoice_url) &&
            data?.invoice_url.length > 0 ? (
              <span className='flex items-center gap-2'>
                <span>View Invoice</span>
                <IoEyeSharp
                  size={34}
                  className='rounded-md border bg-gray-200 px-2 text-gray-400'
                />
              </span>
            ) : (
              'Upload Invoice'
            )}
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Images</DialogTitle>
          <DialogDescription className='sr-only'>
            Images of the invoices
          </DialogDescription>
          <Separator />

          <div
            onClick={() => {
              setOpen(false)
            }}
            className='absolute right-5 top-5 cursor-pointer'
          >
            <Cross2Icon className='h-4 w-4' />
          </div>

          <div className='flex h-fit max-h-[45vh] w-full flex-wrap items-start gap-2 overflow-y-auto overflow-x-hidden'>
            {Array.isArray(data?.invoice_url) && data?.invoice_url.length > 0
              ? data.invoice_url.map((item, index) => (
                  <div
                    key={index}
                    className='relative mr-10 h-24 w-24 shrink-0 cursor-pointer rounded-xl'
                    onClick={() =>
                      setImageToShow(`${APIEndPoints.BackendURL}/${item}`)
                    }
                  >
                    <div
                      onClick={(e) => {
                        handleDelete(e, data._id, item)
                      }}
                      className='absolute -right-5 top-0 cursor-pointer rounded-full bg-red-900 text-white'
                    >
                      <Cross2Icon className='h-4 w-4' />
                    </div>
                    <img
                      src={`${APIEndPoints.BackendURL}/${item}`}
                      alt=''
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                ))
              : null}

            <div
              className='flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border bg-gray-200'
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <FaPlus size={40} className='text-gray-400' />
            </div>
            <input
              id='file-upload'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
            />
          </div>

          {selectedFile && (
            <div className='mt-4'>
              <p>Selected file: {selectedFile.name}</p>
              <button
                onClick={handleSubmit}
                className='mt-2 rounded bg-blue-500 px-4 py-2 text-white'
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload Invoice'}
              </button>
            </div>
          )}

          {error && <p className='mt-2 text-red-500'>{error}</p>}
          {success && <p className='mt-2 text-green-500'>Upload successful!</p>}
        </DialogContent>
      </Dialog>
    </>
  )
}
