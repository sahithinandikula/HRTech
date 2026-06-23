import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import OverviewPipelineBoard from '../components/OverviewPipelineBoard'
import OverviewStatCard from '../components/OverviewStatCard'
import PredictiveInsightCard from '../components/PredictiveInsightCard'
import MilestonesCard from '../components/MilestonesCard'
import WorkspaceLayout from '../components/WorkspaceLayout'
import NewHireModal from '../components/NewHireModal'
import { useEmployees } from '../hooks/useEmployees'
import { dashboardOverviewPage } from '../data/zipScreensData'

function DashboardOverviewPage() {
  const page = dashboardOverviewPage
  const { employees, loading, error } = useEmployees()
  const { user: authUser } = useAuth()
  const [showNewHireModal, setShowNewHireModal] = useState(false)

  // Derive greeting from the authenticated user
  const greetingName = authUser?.name?.split(' ')[0] || 'there'

  if (loading) {
    return (
      <WorkspaceLayout navItems={page.navItems} placeholder={page.searchPlaceholder} topbarLabel={page.topbarLabel} user={page.user}>
        <div className="flex flex-col items-center justify-center py-20"><p className="text-on-surface-variant">Loading dashboard...</p></div>
      </WorkspaceLayout>
    )
  }

  if (error) {
    return (
      <WorkspaceLayout navItems={page.navItems} placeholder={page.searchPlaceholder} topbarLabel={page.topbarLabel} user={page.user}>
        <div className="flex flex-col items-center justify-center py-20 text-error"><p>Error: {error}</p></div>
      </WorkspaceLayout>
    )
  }

  const atRiskEmployees = employees.filter((employee) => employee.isAtRisk)
  const activeEmployees = employees.filter((employee) => employee.progress >= 50)
  const lowEngagementCount = employees.filter((employee) => employee.questionsAsked === 0).length
  const stats = [
    {
      title: 'Total Employees',
      value: `${employees.length}`,
      detail: `${activeEmployees.length} on track`,
      icon: 'groups',
      tone: 'primary',
    },
    {
      title: 'Active',
      value: `${activeEmployees.length}`,
      detail: 'Employees with 50%+ progress',
      icon: 'check_circle',
      tone: 'success',
    },
    {
      title: 'At Risk',
      value: `${atRiskEmployees.length}`,
      detail: `${atRiskEmployees.length ? atRiskEmployees.map((employee) => employee.name.split(' ')[0]).join(', ') : 'No flagged employees'}`,
      icon: 'warning',
      tone: 'warning',
    },
  ]
  const pipelineRows = employees.map((employee) => ({
    name: employee.name,
    role: employee.role,
    progress: employee.progress,
    avatar: employee.avatar,
    score: `${employee.healthScore}`,
    scoreIcon:
      employee.healthStatus.tone === 'green'
        ? 'check_circle'
        : employee.healthStatus.tone === 'yellow'
          ? 'warning'
          : 'error',
    scoreTone: employee.healthStatus.tone,
    lastActive: employee.lastActive,
    questionsAsked: employee.questionsAsked,
    isAtRisk: employee.isAtRisk,
  }))
  const priorityName = atRiskEmployees[0]?.name || employees[0]?.name || 'the team'

  return (
    <>
    <WorkspaceLayout
      navItems={page.navItems}
      placeholder={page.searchPlaceholder}
      topbarLabel={page.topbarLabel}
      user={page.user}
    >
      {lowEngagementCount > 0 && (
        <div className="mb-6 rounded-[24px] border border-[#efcb8a] bg-[#fff8e8] px-6 py-4 font-bold text-[#8c4a04] shadow-sm">
          ⚠️ {lowEngagementCount} employees showing low engagement in first week
        </div>
      )}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
            Good morning, {greetingName}
          </h2>
          <p className="mt-2 text-sm font-medium text-on-surface-variant sm:text-base">
            You have <span className="font-bold text-primary">{employees.length} active</span> onboarding profiles.
            AI suggests prioritizing {priorityName}.
          </p>
        </div>

        <button
          id="new-hire-btn"
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-gradient-to-br from-primary to-primary-container px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:opacity-95 hover-btn-glow"
          type="button"
          onClick={() => setShowNewHireModal(true)}
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          New Hire
        </button>
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <OverviewStatCard key={stat.title} stat={stat} />
        ))}
      </section>

      <OverviewPipelineBoard rows={pipelineRows} />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <PredictiveInsightCard
          insight={{ title: 'Predictive Insight', description: page.predictiveInsight, action: 'Action insight' }}
        />
        <MilestonesCard milestones={page.milestones} />
      </section>
    </WorkspaceLayout>

    {showNewHireModal && (
      <NewHireModal
        onClose={() => setShowNewHireModal(false)}
        onSuccess={() => setShowNewHireModal(false)}
      />
    )}
    </>
  )
}

export default DashboardOverviewPage
