import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { calculateHealthScore, getHealthStatus, employees as localEmployees, employeesById as localEmployeesById } from '../data/employees'
import { supabase } from '../lib/supabase'

const LS_KEY = 'stitch_employees'
const EmployeeContext = createContext(null)

function enrichEmployee(emp) {
  const healthScore = calculateHealthScore(emp)
  const healthStatus = getHealthStatus(healthScore)
  return { ...emp, healthScore, healthStatus, isAtRisk: healthStatus.tone === 'red' }
}

// Try to read from localStorage
function readLocalStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return null
}

// Write to localStorage
function writeLocalStorage(employees) {
  try {
    // Store the raw data (without computed fields)
    const raw = employees.map(({ healthScore, healthStatus, isAtRisk, ...rest }) => rest)
    localStorage.setItem(LS_KEY, JSON.stringify(raw))
  } catch {}
}

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([])
  const [employeesById, setEmployeesById] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Helper to update both state slices
  function applyEmployees(list) {
    setEmployees(list)
    setEmployeesById(Object.fromEntries(list.map((e) => [e.id, e])))
  }

  // Initial load: Supabase → localStorage → mock data
  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const { data, error: sbErr } = await supabase.from('employees').select('*')
        if (sbErr) throw sbErr
        if (!data || data.length === 0) throw new Error('Empty')
        const enriched = data.map(enrichEmployee)
        applyEmployees(enriched)
        writeLocalStorage(enriched)
      } catch {
        // Try localStorage
        const cached = readLocalStorage()
        if (cached) {
          applyEmployees(cached.map(enrichEmployee))
        } else {
          // Final fallback: mock data
          applyEmployees(localEmployees)
        }
        setError(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // addEmployee: try Supabase, fall back to local-only. Always updates in-memory state.
  const addEmployee = useCallback(async (employeeData) => {
    const newEmp = enrichEmployee(employeeData)

    // Optimistically add to state
    setEmployees((prev) => {
      const next = [...prev, newEmp]
      writeLocalStorage(next)
      return next
    })
    setEmployeesById((prev) => ({ ...prev, [newEmp.id]: newEmp }))

    // Attempt Supabase insert in background (non-blocking)
    try {
      const { healthScore, healthStatus, isAtRisk, ...raw } = newEmp
      await supabase.from('employees').insert([raw])
    } catch {
      // Supabase failed — data is already saved locally, so no error to user
      console.warn('Supabase insert failed, data saved locally')
    }
  }, [])

  return (
    <EmployeeContext.Provider value={{ employees, employeesById, loading, error, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployeeContext() {
  const ctx = useContext(EmployeeContext)
  if (!ctx) throw new Error('useEmployeeContext must be used within EmployeeProvider')
  return ctx
}
