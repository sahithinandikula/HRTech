import MaterialIcon from './MaterialIcon'

const toneStyles = {
  primary: {
    card: 'bg-surface-container-lowest',
    iconWrap: 'bg-primary-fixed text-on-primary-fixed-variant',
    detail: 'text-secondary',
    icon: 'trending_up',
  },
  success: {
    card: 'bg-surface-container-lowest',
    iconWrap: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    detail: 'text-on-surface-variant',
    icon: null,
  },
  danger: {
    card:
      'relative scale-[1.02] overflow-hidden border border-error/10 bg-error-container/40 shadow-[0_18px_40px_rgba(186,26,26,0.08)]',
    iconWrap: 'bg-error text-on-error',
    detail: 'text-error',
    icon: 'emergency',
  },
}

function KpiCard({ stat }) {
  const tone = toneStyles[stat.tone]

  return (
    <article className={`rounded-[30px] p-8 shadow-card ${tone.card}`}>
      <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${tone.iconWrap}`}>
        <MaterialIcon name={stat.icon} />
      </div>

      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant">
        {stat.title}
      </p>
      <h3
        className={`font-headline text-5xl font-extrabold ${
          stat.tone === 'danger' ? 'text-on-error-container' : 'text-on-surface'
        }`}
      >
        {stat.value}
      </h3>

      <div className={`mt-5 flex items-center gap-1 text-xs font-bold ${tone.detail}`}>
        {tone.icon ? <MaterialIcon className="text-sm" name={tone.icon} /> : null}
        <span>{stat.detail}</span>
      </div>

      {stat.tone === 'danger' ? (
        <div className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-error/10 blur-3xl" />
      ) : null}
    </article>
  )
}

export default KpiCard
