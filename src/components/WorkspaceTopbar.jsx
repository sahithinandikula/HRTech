import { useAuth } from '../context/AuthContext'
import MaterialIcon from './MaterialIcon'

function WorkspaceTopbar({ placeholder, user: propUser, label, badge }) {
  const { user: authUser } = useAuth()
  const user = authUser || propUser

  return (
    <header className="glass-nav sticky top-0 z-20 flex flex-col gap-4 rounded-[28px] px-5 py-4 shadow-[0_10px_30px_rgba(148,163,184,0.12)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="relative w-full max-w-md">
        <MaterialIcon
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          name="search"
        />
        <input
          className="w-full rounded-full border-0 bg-surface-container-low py-2.5 pl-10 pr-4 text-sm text-on-surface outline-none ring-0 placeholder:text-slate-400 focus:bg-surface-container-lowest focus:shadow-[inset_0_0_0_2px_rgba(0,74,198,0.12)]"
          placeholder={placeholder}
          type="text"
        />
      </div>

      <div className="flex items-center gap-5 self-end sm:self-auto">
        <button className="relative text-slate-500 transition hover:text-primary" type="button">
          <MaterialIcon name="notifications" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-error ring-2 ring-white" />
        </button>
        <button className="text-slate-500 transition hover:text-primary" type="button">
          <MaterialIcon name="help" />
        </button>
        {label || badge ? <div className="hidden h-8 w-px bg-outline-variant/40 sm:block" /> : null}
        {label ? <span className="text-sm font-semibold text-primary">{label}</span> : null}
        {badge ? (
          <span className="rounded-full bg-secondary-fixed px-3 py-1 text-xs font-bold uppercase tracking-tight text-on-secondary-fixed">
            {badge}
          </span>
        ) : null}
        <div className="h-8 w-8 overflow-hidden rounded-full border border-outline-variant bg-surface-container-highest">
          {user.avatar ? (
            <img alt={user.name} className="h-full w-full object-cover" src={user.avatar} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary-fixed text-xs font-bold text-primary">
              {user.initials}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default WorkspaceTopbar
