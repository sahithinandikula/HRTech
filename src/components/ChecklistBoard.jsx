import { useState } from 'react'
import ChecklistSection from './ChecklistSection'
import SectionCard from './SectionCard'

/* ── inline keyframes injected once ── */
const TOAST_STYLE = `
@keyframes _toast-in {
  from { opacity: 0; transform: translateY(-12px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0)     scale(1);    }
}
@keyframes _toast-out {
  from { opacity: 1; transform: translateY(0)     scale(1);    }
  to   { opacity: 0; transform: translateY(-12px) scale(0.95); }
}
._toast-enter { animation: _toast-in  0.32s cubic-bezier(.22,1,.36,1) forwards; }
._toast-leave { animation: _toast-out 0.28s ease-in              forwards; }
`

function ChecklistBoard({ sections }) {
  const [toastState, setToastState] = useState('hidden') // 'hidden' | 'enter' | 'leave'

  function handleSave() {
    if (toastState !== 'hidden') return          // debounce rapid clicks
    setToastState('enter')

    // start fade-out after 2.2 s, fully hide at 2.5 s
    setTimeout(() => setToastState('leave'), 2200)
    setTimeout(() => setToastState('hidden'), 2500)
  }

  return (
    <>
      {/* ── inject keyframes once ── */}
      <style>{TOAST_STYLE}</style>

      {/* ── toast ── */}
      {toastState !== 'hidden' && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-6 top-6 z-[9999] flex items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl ${toastState === 'enter' ? '_toast-enter' : '_toast-leave'}`}
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* checkmark icon */}
          <span
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 26, borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
            Progress has been saved
          </span>
        </div>
      )}

      <SectionCard className="overflow-hidden">
        <div className="px-8 py-10">
          <h3 className="font-headline text-2xl font-extrabold text-on-surface">Step-by-step Integration</h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            Manage your pending actions and documentation.
          </p>
        </div>

        <div className="space-y-12 px-8 pb-12">
          {sections.map((section) => (
            <ChecklistSection key={section.title} section={section} />
          ))}
        </div>

        <div className="flex justify-end bg-surface-container p-8">
          <button
            className="rounded-full bg-gradient-to-br from-primary to-primary-container px-8 py-3 font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:scale-[1.02]"
            type="button"
            onClick={handleSave}
          >
            Save Progress
          </button>
        </div>
      </SectionCard>
    </>
  )
}

export default ChecklistBoard
