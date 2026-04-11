import { Navigate, Route, Routes } from 'react-router-dom'
import AiAssistantPage from './pages/AiAssistantPage'
import DashboardOverviewPage from './pages/DashboardOverviewPage'
import EmployeeDetailPage from './pages/EmployeeDetailPage'
import EmployeesPage from './pages/EmployeesPage'
import OnboardingChecklistPage from './pages/OnboardingChecklistPage'

function App() {
  return (
    <Routes>
      <Route element={<DashboardOverviewPage />} path="/" />
      <Route element={<EmployeesPage />} path="/employees" />
      <Route element={<EmployeeDetailPage />} path="/employees/:id" />
      <Route element={<OnboardingChecklistPage />} path="/checklist" />
      <Route element={<AiAssistantPage />} path="/chat" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}

export default App
