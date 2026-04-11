import { Link } from 'react-router-dom'
import SectionCard from '../components/SectionCard'
import WorkspaceLayout from '../components/WorkspaceLayout'
import { useEmployees } from '../hooks/useEmployees'
import { employeeDetailPage, workspaceUser } from '../data/hrWorkspaceData'

const statusToneClasses = {
  green: 'bg-secondary-fixed/30 text-on-secondary-container',
  yellow: 'bg-tertiary-fixed/40 text-on-tertiary-fixed-variant',
  red: 'bg-error-container text-on-error-container',
}

function EmployeesPage() {
  const { employees, loading, error } = useEmployees()

  if (loading) {
    return (
      <WorkspaceLayout navItems={employeeDetailPage.navItems} placeholder={employeeDetailPage.searchPlaceholder} user={workspaceUser}>
        <div className="flex flex-col items-center justify-center py-20"><p className="text-on-surface-variant">Loading employees...</p></div>
      </WorkspaceLayout>
    )
  }

  if (error) {
    return (
      <WorkspaceLayout navItems={employeeDetailPage.navItems} placeholder={employeeDetailPage.searchPlaceholder} user={workspaceUser}>
        <div className="flex flex-col items-center justify-center py-20 text-error"><p>Error: {error}</p></div>
      </WorkspaceLayout>
    )
  }

  return (
    <WorkspaceLayout
      navItems={employeeDetailPage.navItems}
      placeholder={employeeDetailPage.searchPlaceholder}
      user={workspaceUser}
    >
      <div>
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
          Employees
        </h2>
        <p className="mt-2 text-sm font-medium text-on-surface-variant sm:text-base">
          Browse employee profiles and open detailed onboarding health snapshots.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {employees.map((employee) => (
          <Link key={employee.id} to={`/employees/${employee.id}`}>
            <SectionCard className="h-full p-6 transition hover:-translate-y-0.5 hover:shadow-ambient">
              <div className="flex items-center gap-4">
                <img alt={employee.name} className="h-16 w-16 rounded-2xl object-cover" src={employee.avatar} />
                <div className="min-w-0">
                  <h3 className="truncate font-headline text-xl font-bold text-on-surface">
                    {employee.name}
                  </h3>
                  <p className="truncate text-sm font-medium text-on-surface-variant">{employee.role}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-medium text-on-surface">
                  {employee.team}
                </span>
                <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-medium text-on-surface">
                  {employee.location}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusToneClasses[employee.healthStatus.tone]}`}
                >
                  {employee.healthStatus.label}
                </span>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                {employee.joined}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-on-surface-variant">
                <span>Progress: {employee.progress}%</span>
                <span>Health: {employee.healthScore}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-on-surface-variant">
                <span>Last active: {employee.lastActive}</span>
                <span>Questions: {employee.questionsAsked}</span>
              </div>
            </SectionCard>
          </Link>
        ))}
      </section>
    </WorkspaceLayout>
  )
}

export default EmployeesPage
