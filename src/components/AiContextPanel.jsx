import MaterialIcon from './MaterialIcon'
import PdfUploader from './PdfUploader'
import { supabase } from '../lib/supabase'

function AiContextPanel({ docs, quickActions, image }) {
  const handleActionClick = async (action) => {
    if (action === 'Download Plan Summary') {
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = '/Plan_Summary.pdf'
      a.download = 'Plan_Summary.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      return
    }

    if (action.includes('Download')) {
      let query = supabase.from('documents').select('*')
      const { data } = await query.order('uploaded_at', { ascending: false }).limit(1)

      if (data && data.length > 0) {
        const doc = data[0]
        // Use file_url if it exists, otherwise generate a data URL from the extracted text context
        const fileUrl = doc.file_url || window.URL.createObjectURL(new Blob([doc.content || ''], { type: 'text/plain' }))
        
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = fileUrl
        a.download = doc.name || 'document.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        
        if (!doc.file_url) window.URL.revokeObjectURL(fileUrl)
      }
    }
  }

  return (
    <aside className="hidden w-72 flex-col border-l border-outline-variant/10 bg-surface-container-lowest p-6 xl:flex">
      <h4 className="mb-6 font-headline text-sm font-extrabold uppercase tracking-widest text-on-surface-variant">
        AI Context
      </h4>

      <div className="space-y-6">
        <div className="rounded-xl bg-surface-container-low p-4">
          <p className="mb-2 text-[10px] font-bold text-primary">CONNECTED DATA</p>
          <div className="space-y-3">
            {docs.map((doc) => (
              <div className="flex items-center gap-2" key={doc}>
                <MaterialIcon className="text-sm text-on-surface-variant" name="description" />
                <span className="text-xs font-semibold text-on-surface">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-[10px] font-bold text-on-surface-variant">QUICK ACTIONS</p>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                className="group flex w-full items-center justify-between rounded-lg border border-outline-variant/30 p-3 text-left text-xs font-medium transition hover:bg-surface-container-low"
                key={action}
                onClick={() => handleActionClick(action)}
                type="button"
              >
                <span>{action}</span>
                <MaterialIcon className="text-sm opacity-0 transition group-hover:opacity-100" name={action.includes('Download') ? 'download' : 'event'} />
              </button>
            ))}
            <PdfUploader />
          </div>
        </div>

        <div className="mt-auto">
          <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-2xl">
            <img alt="AI Insight Graphic" className="absolute inset-0 h-full w-full object-cover" src={image} />
            <div className="relative z-10 p-4 text-center">
              <p className="rounded-full bg-black/20 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                New Insight
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AiContextPanel
