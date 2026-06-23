import { useState } from 'react'
import { useEmployeeContext } from '../context/EmployeeContext'

const INITIAL_FORM = {
  name: '',
  role: '',
  team: '',
  location: '',
  joined: '',
  progress: '',
  questionsAsked: '',
}

function NewHireModal({ onClose, onSuccess }) {
  const { addEmployee } = useEmployeeContext()
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await addEmployee({
        id: crypto.randomUUID(),
        name: form.name,
        role: form.role,
        team: form.team,
        location: form.location,
        joined: form.joined,
        progress: Number(form.progress) || 0,
        questionsAsked: Number(form.questionsAsked) || 0,
        lastActive: 'Just now',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(form.name)}`,
      })

      setSuccess(true)
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10,12,24,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-lg rounded-[24px] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #1a1f3a 0%, #141828 100%)',
          border: '1px solid rgba(99,120,255,0.18)',
          padding: '2rem',
        }}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '22px',
                color: '#6378ff',
                background: 'rgba(99,120,255,0.12)',
                borderRadius: '10px',
                padding: '6px',
              }}
            >
              person_add
            </span>
            <h2
              style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#f0f2ff',
                margin: 0,
              }}
            >
              Add New Hire
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#9ba3c4',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              close
            </span>
          </button>
        </div>

        {/* Success state */}
        {success ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '48px',
                color: '#4ade80',
                background: 'rgba(74,222,128,0.12)',
                borderRadius: '50%',
                padding: '12px',
              }}
            >
              check_circle
            </span>
            <p style={{ color: '#c6cde8', fontSize: '1rem', margin: 0 }}>
              <strong style={{ color: '#f0f2ff' }}>{form.name}</strong> has been added successfully!
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                marginTop: '8px',
                padding: '10px 28px',
                borderRadius: '999px',
                border: 'none',
                background: 'linear-gradient(135deg,#6378ff,#818cf8)',
                color: '#fff',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Two-column grid for short fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { label: 'Full Name', name: 'name', placeholder: 'e.g. Alex Johnson', type: 'text', required: true },
                { label: 'Role', name: 'role', placeholder: 'e.g. Software Engineer', type: 'text', required: true },
                { label: 'Team', name: 'team', placeholder: 'e.g. Engineering', type: 'text', required: true },
                { label: 'Location', name: 'location', placeholder: 'e.g. New York, NY', type: 'text', required: false },
              ].map(({ label, name, placeholder, type, required }) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label
                    htmlFor={`new-hire-${name}`}
                    style={{ fontSize: '0.75rem', fontWeight: '600', color: '#7c85b3', letterSpacing: '0.04em' }}
                  >
                    {label.toUpperCase()}
                    {required && <span style={{ color: '#f87171', marginLeft: '2px' }}>*</span>}
                  </label>
                  <input
                    id={`new-hire-${name}`}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    required={required}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>

            {/* Full-width date field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                htmlFor="new-hire-joined"
                style={{ fontSize: '0.75rem', fontWeight: '600', color: '#7c85b3', letterSpacing: '0.04em' }}
              >
                JOINED
              </label>
              <input
                id="new-hire-joined"
                name="joined"
                type="text"
                placeholder="e.g. 2024-04-14"
                value={form.joined}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Number fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { label: 'Progress (%)', name: 'progress', placeholder: '0–100', min: 0, max: 100 },
                { label: 'Questions Asked', name: 'questionsAsked', placeholder: '0', min: 0 },
              ].map(({ label, name, placeholder, min, max }) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label
                    htmlFor={`new-hire-${name}`}
                    style={{ fontSize: '0.75rem', fontWeight: '600', color: '#7c85b3', letterSpacing: '0.04em' }}
                  >
                    {label.toUpperCase()}
                  </label>
                  <input
                    id={`new-hire-${name}`}
                    name={name}
                    type="number"
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(248,113,113,0.1)',
                  border: '1px solid rgba(248,113,113,0.25)',
                  color: '#f87171',
                  fontSize: '0.83rem',
                }}
              >
                {error}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '11px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent',
                  color: '#9ba3c4',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  flex: 1,
                  padding: '11px',
                  borderRadius: '999px',
                  border: 'none',
                  background: submitting
                    ? 'rgba(99,120,255,0.5)'
                    : 'linear-gradient(135deg,#6378ff,#818cf8)',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {submitting ? (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '16px', animation: 'spin 1s linear infinite' }}
                    >
                      progress_activity
                    </span>
                    Saving...
                  </>
                ) : (
                  'Add Employee'
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { opacity: 0.4; }
      `}</style>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid rgba(99,120,255,0.2)',
  background: 'rgba(255,255,255,0.04)',
  color: '#e8eaf6',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  boxSizing: 'border-box',
}

export default NewHireModal
