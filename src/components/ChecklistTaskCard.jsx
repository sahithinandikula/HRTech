import MaterialIcon from './MaterialIcon'
import StatusBadge from './StatusBadge'

function ChecklistTaskCard({ item, onToggle }) {
  const isCompleted = item.status === 'Completed'

  return (
    <div
      className="group flex cursor-pointer items-center justify-between rounded-2xl bg-surface-container-low/40 p-5 transition hover:bg-surface-container-low"
      onClick={() => onToggle && onToggle(item.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle && onToggle(item.title)}
    >
      <div className="flex items-center gap-5">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full transition group-hover:shadow-sm ${
          isCompleted ? 'bg-green-50 text-green-600' : 'bg-white text-primary'
        }`}>
          <MaterialIcon name={isCompleted ? 'check_circle' : item.icon} />
        </div>
        <div>
          <p className={`font-bold ${isCompleted ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>{item.title}</p>
          <p className="text-xs text-on-surface-variant">{item.description}</p>
        </div>
      </div>

      <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
    </div>
  )
}

export default ChecklistTaskCard
