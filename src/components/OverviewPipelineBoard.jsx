import { useState, useEffect } from 'react'
import MaterialIcon from './MaterialIcon'
import ProgressBar from './ProgressBar'
import SectionCard from './SectionCard'

const scoreToneClasses = {
  green: 'bg-secondary-fixed/20 text-on-secondary-fixed-variant',
  yellow: 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant',
  red: 'bg-error-container text-on-error-container',
  neutral: 'bg-surface-container-high text-on-surface-variant',
}

/* ── Inline styles for the check-in success popup ── */
const popupOverlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.35)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  animation: 'checkinFadeIn 0.3s ease',
}

const popupCardStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '44px 52px 36px',
  borderRadius: '32px',
  background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 40%, #dbeafe 100%)',
  boxShadow: '0 30px 80px rgba(37,99,235,0.18), 0 8px 24px rgba(0,0,0,0.08)',
  animation: 'checkinPopIn 0.45s cubic-bezier(.17,.67,.29,1.3)',
  textAlign: 'center',
  maxWidth: '380px',
  width: '90vw',
}

const checkmarkRingStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 12px 32px rgba(34,197,94,0.35)',
  animation: 'checkinPulse 1.6s ease-in-out infinite',
  marginBottom: '8px',
}

const popupKeyframes = `
@keyframes checkinFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes checkinPopIn {
  0%   { opacity: 0; transform: scale(0.7) translateY(20px); }
  100% { opacity: 1; transform: scale(1)   translateY(0); }
}
@keyframes checkinPulse {
  0%, 100% { box-shadow: 0 12px 32px rgba(34,197,94,0.35); }
  50%      { box-shadow: 0 16px 48px rgba(34,197,94,0.55); }
}
@keyframes checkinProgressBar {
  from { width: 100%; }
  to   { width: 0%; }
}
`

function CheckInSuccessPopup({ recipientName, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <>
      <style>{popupKeyframes}</style>
      <div style={popupOverlayStyle} onClick={onClose} role="dialog" aria-label="Check-in sent confirmation">
        <div style={popupCardStyle} onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '14px', right: '18px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94a3b8', fontSize: '20px', lineHeight: 1,
            }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Animated checkmark */}
          <div style={checkmarkRingStyle}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <path
                d="M10 19.5L16.5 26L28 13"
                stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 40,
                  strokeDashoffset: 40,
                  animation: 'checkinDrawCheck 0.5s 0.35s ease forwards',
                }}
              />
            </svg>
            <style>{`@keyframes checkinDrawCheck { to { stroke-dashoffset: 0; } }`}</style>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em',
            color: '#0f172a', margin: 0,
          }}>
            Check-in Sent!
          </h3>

          {/* Subtitle */}
          <p style={{
            fontSize: '14px', color: '#64748b', margin: '0 0 4px', lineHeight: 1.5,
          }}>
            A check-in message was sent to<br />
            <span style={{ fontWeight: 700, color: '#2563eb' }}>{recipientName}</span>
          </p>

          {/* Auto-dismiss progress bar */}
          <div style={{
            width: '100%', height: '4px', borderRadius: '4px',
            background: '#e2e8f0', overflow: 'hidden', marginTop: '8px',
          }}>
            <div style={{
              height: '100%', borderRadius: '4px',
              background: 'linear-gradient(90deg, #22c55e, #16a34a)',
              animation: 'checkinProgressBar 2.5s linear forwards',
            }} />
          </div>
        </div>
      </div>
    </>
  )
}

function OverviewPipelineBoard({ rows }) {
  const [checkinTarget, setCheckinTarget] = useState(null)

  return (
    <>
      <SectionCard className="p-6 sm:p-8 xl:p-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-headline text-2xl font-bold text-on-surface">Onboarding Pipeline</h3>
            <p className="mt-1 text-sm text-on-surface-variant">
              Real-time completion tracking for new hires
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full bg-secondary-fixed/30 px-4 py-2 text-xs font-bold text-on-secondary-container">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            AI Optimizer Active
          </div>
        </div>

        <div className="space-y-4">
          {rows.map((person) => (
            <div
              className={`flex flex-col gap-6 rounded-[28px] px-2 py-3 transition hover:bg-surface-container-low lg:flex-row lg:items-center lg:px-6 ${
                person.isAtRisk ? 'bg-error-container/40 ring-1 ring-error/10' : ''
              }`}
              key={person.name}
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <img alt={person.name} className="h-14 w-14 rounded-full object-cover ring-4 ring-surface" src={person.avatar} />
                <div className="min-w-0">
                  <h4 className="truncate text-base font-bold text-on-surface">{person.name}</h4>
                  <p className="truncate text-sm text-on-surface-variant">
                    {person.role} • {person.lastActive}
                  </p>
                </div>
              </div>

              <div className="w-full lg:max-w-xs lg:flex-1">
                <div className="mb-2 flex justify-between text-xs font-bold text-on-surface-variant">
                  <span>Progress</span>
                  <span>{person.progress}%</span>
                </div>
                <ProgressBar value={person.progress} />
              </div>

              <div className="flex w-full items-start justify-between gap-4 lg:w-auto lg:items-center lg:justify-end">
                <div className="flex flex-col lg:items-end">
                  <span className="mb-1 text-[11px] font-bold text-on-surface-variant">Health Score</span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${scoreToneClasses[person.scoreTone]}`}
                  >
                    <MaterialIcon className="text-[14px]" name={person.scoreIcon} />
                    {person.score}
                  </span>
                  <span className="mt-1 text-[11px] font-medium text-on-surface-variant">
                    {person.questionsAsked} questions asked
                  </span>
                </div>
                <button
                  className="rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition hover:bg-primary/20"
                  onClick={() => setCheckinTarget(person.name)}
                  type="button"
                >
                  Send Check-in
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full text-outline transition hover:bg-surface-container-highest"
                  type="button"
                >
                  <MaterialIcon name="more_vert" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-outline-variant/10 pt-8 text-center">
          <button className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:underline" type="button">
            View complete pipeline
            <MaterialIcon className="text-base" name="arrow_forward" />
          </button>
        </div>
      </SectionCard>

      {checkinTarget && (
        <CheckInSuccessPopup
          recipientName={checkinTarget}
          onClose={() => setCheckinTarget(null)}
        />
      )}
    </>
  )
}

export default OverviewPipelineBoard
