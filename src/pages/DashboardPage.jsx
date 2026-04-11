import AlertBanner from '../components/AlertBanner'
import InsightCard from '../components/InsightCard'
import KpiCard from '../components/KpiCard'
import MilestonesCard from '../components/MilestonesCard'
import PageHeader from '../components/PageHeader'
import PipelineBoard from '../components/PipelineBoard'
import PredictiveInsightCard from '../components/PredictiveInsightCard'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import {
  alertBanner,
  insights,
  milestones,
  pipelineRows,
  predictiveInsight,
  stats,
} from '../data/dashboardData'

function DashboardPage() {
  return (
    <main className="min-h-screen bg-transparent text-on-surface">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:min-h-screen lg:flex-row">
        <Sidebar />

        <div className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <Topbar />

          <div className="space-y-8 pb-8 pt-8 sm:pt-10">
            <AlertBanner alert={alertBanner} />
            <PageHeader />

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {stats.map((stat) => (
                <KpiCard key={stat.title} stat={stat} />
              ))}
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
              {insights.map((insight) => (
                <InsightCard insight={insight} key={insight.title} />
              ))}
            </section>

            <PipelineBoard rows={pipelineRows} />

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <PredictiveInsightCard insight={predictiveInsight} />
              <MilestonesCard milestones={milestones} />
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
