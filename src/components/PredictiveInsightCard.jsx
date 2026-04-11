import MaterialIcon from './MaterialIcon'

function PredictiveInsightCard({ insight }) {
  const [beforeRisk, afterRisk] = insight.description.split('40% risk')

  return (
    <article className="rounded-[30px] border border-primary/10 bg-primary/5 p-8">
      <div className="mb-4 flex items-center gap-3">
        <MaterialIcon className="text-primary" name="auto_awesome" />
        <h4 className="font-headline text-lg font-bold text-on-surface">{insight.title}</h4>
      </div>

      <p className="text-sm leading-7 text-on-surface-variant">
        {beforeRisk}
        <span className="font-bold text-tertiary">40% risk</span>
        {afterRisk}
      </p>

      <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary" type="button">
        {insight.action}
        <MaterialIcon className="text-base" name="chevron_right" />
      </button>
    </article>
  )
}

export default PredictiveInsightCard
