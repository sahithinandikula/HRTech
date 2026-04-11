import MaterialIcon from './MaterialIcon'
import SectionCard from './SectionCard'

function ManagerCard({ manager }) {
  return (
    <SectionCard className="border border-outline-variant/15 p-8">
      <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-on-surface">Reports To</h4>
      <div className="flex items-center gap-4">
        <img alt={manager.name} className="h-14 w-14 rounded-full object-cover" src={manager.photo} />
        <div>
          <p className="font-bold text-on-surface">{manager.name}</p>
          <p className="text-xs text-on-surface-variant">{manager.role}</p>
        </div>
        <button
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high transition hover:bg-primary-fixed"
          type="button"
        >
          <MaterialIcon className="text-sm" name="chat_bubble" />
        </button>
      </div>
    </SectionCard>
  )
}

export default ManagerCard
