// import { useDownloadExportersQuery } from '@/store/actions/slices/exportersSlice'
import { APIEndPoints } from '@/APIEndpoints'
import { useState } from 'react'
import { FaFileExport } from 'react-icons/fa'

const DownloadExporters = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)

    try {
      const pdfUrl = `${APIEndPoints.BackendURL}${APIEndPoints.download_buyer_list}`

      const newTab = window.open(pdfUrl, '_blank')
      if (newTab) {
        newTab.document.title = `exporters.pdf`
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Error generating invoice:', error)
      setIsLoading(false)
    }
  }

  return (
    <div
      className='flex cursor-pointer items-center gap-2 underline'
      onClick={handleDownload}
    >
      {isLoading ? (
        'Generating...'
      ) : (
        <>
          <div>Export</div>
          <FaFileExport />
        </>
      )}
    </div>
  )
}

export default DownloadExporters
