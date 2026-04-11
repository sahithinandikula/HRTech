import { currentUser, navItems } from '../data/dashboardData'
import MaterialIcon from './MaterialIcon'

function Sidebar() {
  return (
    <aside className="flex h-full flex-col bg-[#f9fbfe] px-4 py-6 lg:w-64 lg:border-r lg:border-white/40">
      <div className="mb-10 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
            <MaterialIcon name="cognition" />
          </div>

          <div>
            <h1 className="font-headline text-2xl font-bold leading-none tracking-tight text-slate-900">
              Cognitive Sanctuary
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500">HR Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
              item.active
                ? 'border-r-4 border-primary bg-primary/5 font-bold text-primary'
                : 'text-slate-500 hover:bg-slate-200/40'
            }`}
            type="button"
          >
            <MaterialIcon className="text-[18px]" name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto px-4 pt-6">
        <div className="flex items-center gap-3 rounded-[24px] bg-surface-container-low p-4 text-on-surface-variant shadow-[0_10px_22px_rgba(148,163,184,0.08)]">
          <img
            alt={currentUser.name}
            className="h-10 w-10 rounded-full object-cover"
            src={currentUser.avatar}
          />
          <div>
            <p className="text-sm font-bold text-on-surface">{currentUser.name}</p>
            <p className="text-xs">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
