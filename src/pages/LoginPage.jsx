import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThreeDBackground from '../components/ThreeDBackground'

function LoginPage() {
  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle, loading: authLoading } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate replace to="/" />

  async function handleEmailSubmit(e) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setSubmitting(true)

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          setError('Please enter your full name.')
          setSubmitting(false)
          return
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match.')
          setSubmitting(false)
          return
        }
        const { error: err } = await signUpWithEmail(email, password, fullName.trim())
        if (err) throw err
        setInfo('Account created! Check your email to confirm, then sign in.')
        setIsSignUp(false)
      } else {
        const { error: err } = await signInWithEmail(email, password)
        if (err) throw err
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    const { error: err } = await signInWithGoogle()
    if (err) setError(err.message)
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div style={{ width: 32, height: 32, border: '3px solid #e5e7eb', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <ThreeDBackground />
      <div className="animate-page-entry" style={styles.card}>
        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.logo}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff' }}>hub</span>
          </div>
          <span style={styles.appName}>Stitch</span>
        </div>

        <h1 style={styles.heading}>{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
        <p style={styles.sub}>{isSignUp ? 'Get started with your HR workspace' : 'Sign in to continue to your dashboard'}</p>

        {/* Google */}
        <button type="button" onClick={handleGoogle} style={styles.googleBtn}>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.97-6.19A23.998 23.998 0 0 0 0 24c0 3.77.87 7.35 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailSubmit} style={styles.form}>
          {isSignUp && (
            <div style={styles.field}>
              <label htmlFor="auth-name" style={styles.label}>Full name</label>
              <input id="auth-name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Sarah Mitchell" style={styles.input} autoComplete="name" />
            </div>
          )}

          <div style={styles.field}>
            <label htmlFor="auth-email" style={styles.label}>Email</label>
            <input id="auth-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={styles.input} autoComplete="email" />
          </div>

          <div style={styles.field}>
            <label htmlFor="auth-pw" style={styles.label}>Password</label>
            <input id="auth-pw" type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={styles.input} autoComplete={isSignUp ? 'new-password' : 'current-password'} />
          </div>

          {isSignUp && (
            <div style={styles.field}>
              <label htmlFor="auth-pw2" style={styles.label}>Confirm password</label>
              <input id="auth-pw2" type="password" required minLength={6} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" style={styles.input} autoComplete="new-password" />
            </div>
          )}

          {error && <p style={styles.error}>{error}</p>}
          {info && <p style={styles.info}>{info}</p>}

          {/* Primary action */}
          <button type="submit" disabled={submitting} style={styles.primaryBtn}>
            {submitting ? (isSignUp ? 'Creating account…' : 'Signing in…') : (isSignUp ? 'Create account' : 'Sign in')}
          </button>
        </form>

        {/* Toggle mode */}
        <p style={styles.toggle}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setInfo(null) }}
            style={styles.toggleLink}
          >
            {isSignUp ? 'Sign in' : 'Create account'}
          </button>
        </p>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

/* ── Light-theme styles ── */
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    padding: '2rem 1rem',
    fontFamily: "'Inter', sans-serif",
  },

  card: {
    width: '100%',
    maxWidth: 400,
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    padding: '2rem 1.75rem',
    boxShadow: '0 10px 30px -10px rgba(148, 163, 184, 0.12), 0 1px 3px rgba(0,0,0,0.02)',
    position: 'relative',
    zIndex: 1,
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: '#111827',
    letterSpacing: '-0.02em',
  },

  heading: {
    margin: 0,
    fontSize: '1.35rem',
    fontWeight: 700,
    color: '#111827',
  },
  sub: {
    margin: '4px 0 0',
    fontSize: '0.85rem',
    color: '#6b7280',
    fontWeight: 400,
  },

  /* Google button */
  googleBtn: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: '10px 0',
    borderRadius: 10,
    border: '1px solid #d1d5db',
    background: '#fff',
    color: '#374151',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background .15s, border-color .15s',
  },

  /* Divider */
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    margin: '20px 0',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: '#e5e7eb',
  },
  dividerText: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  /* Form */
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid #d1d5db',
    background: '#fff',
    color: '#111827',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color .15s, box-shadow .15s',
    boxSizing: 'border-box',
  },

  error: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#dc2626',
    fontWeight: 500,
  },
  info: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#16a34a',
    fontWeight: 500,
  },

  primaryBtn: {
    width: '100%',
    padding: '11px 0',
    borderRadius: 10,
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'background .15s',
    marginTop: 2,
  },

  toggle: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: '0.82rem',
    color: '#6b7280',
  },
  toggleLink: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontWeight: 700,
    fontSize: '0.82rem',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'none',
  },
}

export default LoginPage
