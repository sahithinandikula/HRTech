import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AiAssistantPage from './pages/AiAssistantPage'
import DashboardOverviewPage from './pages/DashboardOverviewPage'
import EmployeeDetailPage from './pages/EmployeeDetailPage'
import EmployeesPage from './pages/EmployeesPage'
import LoginPage from './pages/LoginPage'
import OnboardingChecklistPage from './pages/OnboardingChecklistPage'

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route element={<LoginPage />} path="/login" />

      {/* Protected routes */}
      <Route element={<ProtectedRoute><DashboardOverviewPage /></ProtectedRoute>} path="/" />
      <Route element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} path="/employees" />
      <Route element={<ProtectedRoute><EmployeeDetailPage /></ProtectedRoute>} path="/employees/:id" />
      <Route element={<ProtectedRoute><OnboardingChecklistPage /></ProtectedRoute>} path="/checklist" />
      <Route element={<ProtectedRoute><AiAssistantPage /></ProtectedRoute>} path="/chat" />

      {/* Catch-all */}
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}

export default App

