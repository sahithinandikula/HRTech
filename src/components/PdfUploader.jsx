import { useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { supabase } from '../lib/supabase'
import MaterialIcon from './MaterialIcon'

// Initialize the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker


function PdfUploader() {
  const [status, setStatus] = useState('Upload PDF')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      setIsUploading(true)
      setStatus('Reading PDF...')

      // 1. Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer()

      // 2. Load PDF document
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
      const pdf = await loadingTask.promise

      // 3. Extract text from all pages
      let fullText = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item) => item.str).join(' ')
        fullText += pageText + '\n'
      }

      setStatus('Uploading...')

      // 4. Send to Supabase
      const { error } = await supabase.from('documents').insert({
        name: file.name,
        content: fullText.trim(),
        uploaded_at: new Date().toISOString(),
      })

      if (error) {
        throw error
      }

      setStatus('Upload successful')
      setTimeout(() => setStatus('Upload PDF'), 3000)
    } catch (err) {
      console.error(err)
      setStatus('Error uploading')
      setTimeout(() => setStatus('Upload PDF'), 3000)
    } finally {
      setIsUploading(false)
      // Reset input so the same file could be uploaded again if needed
      event.target.value = ''
    }
  }

  const handleButtonClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <>
      <input
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />
      <button
        className={`group flex w-full items-center justify-between rounded-lg border border-outline-variant/30 p-3 text-left text-xs font-medium transition hover:bg-surface-container-low ${
          isUploading ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={isUploading}
        onClick={handleButtonClick}
        type="button"
      >
        <span>{status}</span>
        <MaterialIcon
          className="text-sm opacity-0 transition group-hover:opacity-100"
          name={status === 'Upload successful' ? 'check_circle' : status === 'Error uploading' ? 'error' : 'upload_file'}
        />
      </button>
    </>
  )
}

export default PdfUploader
