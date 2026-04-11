import MaterialIcon from './MaterialIcon'
import StatusBadge from './StatusBadge'

function ChecklistTaskCard({ item }) {
  return (
    <div className="group flex items-center justify-between rounded-2xl bg-surface-container-low/40 p-5 transition hover:bg-surface-container-low">
      <div className="flex items-center gap-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary transition group-hover:shadow-sm">
          <MaterialIcon name={item.icon} />
        </div>
        <div>
          <p className="font-bold text-on-surface">{item.title}</p>
          <p className="text-xs text-on-surface-variant">{item.description}</p>
        </div>
      </div>

      <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
    </div>
  )
}

export default ChecklistTaskCard
