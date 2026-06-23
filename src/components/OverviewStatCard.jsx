import MaterialIcon from './MaterialIcon'

const toneStyles = {
  primary: {
    iconWrap: 'bg-primary-fixed text-on-primary-fixed-variant',
    detail: 'text-secondary',
    detailIcon: 'trending_up',
  },
  success: {
    iconWrap: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    detail: 'text-on-surface-variant',
    detailIcon: null,
  },
  warning: {
    iconWrap: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    detail: 'text-tertiary',
    detailIcon: 'priority_high',
  },
}

function OverviewStatCard({ stat }) {
  const tone = toneStyles[stat.tone]

  return (
    <article className="relative overflow-hidden rounded-[30px] bg-surface-container-lowest p-8 shadow-card hover-card-premium">
      <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${tone.iconWrap}`}>
        <MaterialIcon name={stat.icon} />
      </div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant">
        {stat.title}
      </p>
      <h3 className="font-headline text-5xl font-extrabold text-on-surface">{stat.value}</h3>
      <div className={`mt-5 flex items-center gap-1 text-xs font-bold ${tone.detail}`}>
        {tone.detailIcon ? <MaterialIcon className="text-sm" name={tone.detailIcon} /> : null}
        <span>{stat.detail}</span>
      </div>
      {stat.tone === 'warning' ? (
        <div className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-tertiary/5 blur-3xl" />
      ) : null}
    </article>
  )
}

export default OverviewStatCard
