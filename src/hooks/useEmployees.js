import { useEmployeeContext } from '../context/EmployeeContext'

export function useEmployees() {
  return useEmployeeContext()
}
