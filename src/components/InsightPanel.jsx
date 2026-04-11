import MaterialIcon from './MaterialIcon'
import SectionCard from './SectionCard'

function InsightPanel({ text }) {
  return (
    <SectionCard className="border-l-4 border-secondary p-8">
      <div className="mb-4 flex items-center gap-2">
        <MaterialIcon
          className="[font-variation-settings:'FILL'_1,'wght'_500,'GRAD'_0,'opsz'_24] text-secondary"
          name="auto_awesome"
        />
        <span className="rounded-full bg-secondary-fixed px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-on-secondary-fixed-variant">
          AI Insight
        </span>
      </div>
      <p className="text-sm leading-7 text-on-surface-variant">{text}</p>
    </SectionCard>
  )
}

export default InsightPanel
