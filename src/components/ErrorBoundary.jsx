import { Component } from 'react'

/**
 * Global error boundary to catch runtime React errors.
 * Prevents the entire app from going blank on unexpected crashes.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f9fa',
            fontFamily: "'Inter', sans-serif",
            padding: '2rem',
          }}
        >
          <div
            style={{
              maxWidth: 420,
              textAlign: 'center',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 16,
              padding: '2.5rem 2rem',
              boxShadow: '0 10px 30px -10px rgba(148,163,184,0.12)',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                margin: '0 auto 1.25rem',
                borderRadius: 16,
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 28,
              }}
            >
              !
            </div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
              Something went wrong
            </h1>
            <p style={{ marginTop: 8, fontSize: '0.875rem', color: '#6b7280' }}>
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                marginTop: 20,
                padding: '10px 24px',
                borderRadius: 10,
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
