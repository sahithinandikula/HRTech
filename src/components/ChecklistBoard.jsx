import ChecklistSection from './ChecklistSection'
import SectionCard from './SectionCard'

function ChecklistBoard({ sections }) {
  return (
    <SectionCard className="overflow-hidden">
      <div className="px-8 py-10">
        <h3 className="font-headline text-2xl font-extrabold text-on-surface">Step-by-step Integration</h3>
        <p className="mt-1 text-sm text-on-surface-variant">
          Manage your pending actions and documentation.
        </p>
      </div>

      <div className="space-y-12 px-8 pb-12">
        {sections.map((section) => (
          <ChecklistSection key={section.title} section={section} />
        ))}
      </div>

      <div className="flex justify-end bg-surface-container p-8">
        <button
          className="rounded-full bg-gradient-to-br from-primary to-primary-container px-8 py-3 font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:scale-[1.02]"
          type="button"
        >
          Save Progress
        </button>
      </div>
    </SectionCard>
  )
}

export default ChecklistBoard
