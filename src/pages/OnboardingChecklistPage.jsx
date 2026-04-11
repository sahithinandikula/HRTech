import ChecklistBoard from '../components/ChecklistBoard'
import ChecklistOverviewCard from '../components/ChecklistOverviewCard'
import CultureSessionCard from '../components/CultureSessionCard'
import InsightPanel from '../components/InsightPanel'
import MilestoneStatusCard from '../components/MilestoneStatusCard'
import WorkspaceLayout from '../components/WorkspaceLayout'
import { onboardingChecklistPage, workspaceUser } from '../data/hrWorkspaceData'

function OnboardingChecklistPage() {
  const page = onboardingChecklistPage

  return (
    <WorkspaceLayout navItems={page.navItems} placeholder={page.searchPlaceholder} user={workspaceUser}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">
            {page.title}
          </h2>
          <p className="mt-2 text-on-surface-variant">{page.description}</p>
        </div>

        <ChecklistOverviewCard value={page.overallCompletion} />
      </div>

      <section className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-6">
          <InsightPanel text={page.insight} />
          <MilestoneStatusCard milestones={page.milestones} />
          <CultureSessionCard card={page.cultureCard} />
        </div>

        <ChecklistBoard sections={page.sections} />
      </section>
    </WorkspaceLayout>
  )
}

export default OnboardingChecklistPage
