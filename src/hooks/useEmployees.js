import { useEffect, useState } from 'react'
import { calculateHealthScore, getHealthStatus } from '../data/employees'
import { supabase } from '../lib/supabase'

export function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [employeesById, setEmployeesById] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        setLoading(true)
        setError(null)

        const { data, error: supabaseError } = await supabase.from('employees').select('*')
        
        if (supabaseError) {
          throw supabaseError
        }

        if (!data) {
          throw new Error('No data returned from Supabase')
        }

        const enrichedEmployees = data.map((employee) => {
          const healthScore = calculateHealthScore(employee)
          const healthStatus = getHealthStatus(healthScore)

          return {
            ...employee,
            healthScore,
            healthStatus,
            isAtRisk: healthStatus.tone === 'red',
          }
        })

        setEmployees(enrichedEmployees)
        
        const byId = Object.fromEntries(enrichedEmployees.map((emp) => [emp.id, emp]))
        setEmployeesById(byId)
      } catch (err) {
        console.error('Error fetching employees:', err)
        setError(err.message || 'An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  return { employees, employeesById, loading, error }
}
