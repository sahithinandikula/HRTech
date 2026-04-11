import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ActivityTimeline from '../components/ActivityTimeline'
import EmployeeHeader from '../components/EmployeeHeader'
import ExpertiseCard from '../components/ExpertiseCard'
import HealthScoreCard from '../components/HealthScoreCard'
import ManagerCard from '../components/ManagerCard'
import ProfileChecklistCard from '../components/ProfileChecklistCard'
import QuickStatsCard from '../components/QuickStatsCard'
import WorkspaceLayout from '../components/WorkspaceLayout'
import { useEmployees } from '../hooks/useEmployees'
import { employeeDetailPages, workspaceUser } from '../data/hrWorkspaceData'

function EmployeeDetailPage() {
  const { id } = useParams()
  const { employeesById, loading, error } = useEmployees()

  const page = useMemo(() => {
    if (loading || error || Object.keys(employeesById).length === 0) return null

    const template = employeeDetailPages[id] || employeeDetailPages['alex-rivera']
    const employee = employeesById[id] || Object.values(employeesById)[0]

    if (!employee) return null

    return {
      ...template,
      breadcrumbs: ['Employees', employee.name],
      profile: {
        ...template.profile,
        id: employee.id,
        name: employee.name,
        title: employee.role,
        joined: employee.joined,
        team: employee.team,
        location: employee.location,
        photo: employee.avatar,
        lastActive: employee.lastActive,
        questionsAsked: employee.questionsAsked,
      },
      healthScore: {
        value: employee.healthScore,
        label: employee.healthStatus.label,
        tone: employee.healthStatus.tone,
        summary: `${employee.name} has ${employee.progress}% onboarding progress and was last active ${employee.lastActive.toLowerCase()}.`,
        insight:
          employee.isAtRisk
            ? 'AI INSIGHT: EMPLOYEE REQUIRES FOLLOW-UP'
            : 'AI INSIGHT: ONBOARDING HEALTHY',
      },
      quickStats: [
        { label: 'Progress', value: `${employee.progress}%` },
        {
          label: 'Health',
          value: employee.healthStatus.label,
          accent:
            employee.healthStatus.tone === 'green'
              ? 'text-secondary'
              : employee.healthStatus.tone === 'yellow'
                ? 'text-tertiary'
                : 'text-error',
        },
        { label: 'Questions', value: `${employee.questionsAsked}` },
      ],
    }
  }, [id, employeesById, loading, error])

  if (loading) {
    return (
      <WorkspaceLayout navItems={employeeDetailPages['alex-rivera']?.navItems || []} placeholder="Search talent or insights..." user={workspaceUser}>
        <div className="flex flex-col items-center justify-center py-20"><p className="text-on-surface-variant">Loading profile...</p></div>
      </WorkspaceLayout>
    )
  }

  if (error || !page) {
    return (
      <WorkspaceLayout navItems={employeeDetailPages['alex-rivera']?.navItems || []} placeholder="Search talent or insights..." user={workspaceUser}>
        <div className="flex flex-col items-center justify-center py-20 text-error"><p>Error loading profile data</p></div>
      </WorkspaceLayout>
    )
  }

  return (
    <WorkspaceLayout navItems={page.navItems} placeholder={page.searchPlaceholder} user={workspaceUser}>
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant">
        <span>{page.breadcrumbs[0]}</span>
        <span>&gt;</span>
        <span className="font-medium text-primary">{page.profile.name}</span>
      </nav>

      <EmployeeHeader profile={page.profile} />

      <section className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
        <HealthScoreCard score={page.healthScore} />
        <ProfileChecklistCard checklist={page.onboardingChecklist} />
      </section>

      <section className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_420px]">
        <ActivityTimeline items={page.activities} />
        <div className="space-y-8">
          <QuickStatsCard stats={page.quickStats} />
          <ManagerCard manager={page.manager} />
          <ExpertiseCard tags={page.expertise} />
        </div>
      </section>
    </WorkspaceLayout>
  )
}

export default EmployeeDetailPage
