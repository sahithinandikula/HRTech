import { NavLink } from 'react-router-dom'
import MaterialIcon from './MaterialIcon'

function WorkspaceSidebar({ items, user }) {
  return (
    <aside className="flex h-full flex-col bg-[#f9fbfe] px-4 py-6 lg:w-64 lg:border-r lg:border-white/40">
      <div className="mb-10 px-4">
        <h1 className="font-headline text-2xl font-bold leading-none tracking-tight text-slate-900">
          Cognitive Sanctuary
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-on-surface-variant">
          HR Intelligence
        </p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? 'border-r-4 border-primary bg-primary/5 font-bold text-primary'
                  : 'text-slate-500 hover:bg-slate-200/40'
              }`
            }
            end={item.end}
            key={item.label}
            to={item.href}
          >
            {({ isActive }) => (
              <>
                <MaterialIcon
                  className={
                    isActive
                      ? "[font-variation-settings:'FILL'_1,'wght'_500,'GRAD'_0,'opsz'_24] text-[18px]"
                      : 'text-[18px]'
                  }
                  name={item.icon}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4">
        <button
          className="mb-4 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-500 transition hover:bg-slate-200/40"
          type="button"
        >
          <MaterialIcon className="text-[18px]" name="settings" />
          <span>Settings</span>
        </button>

        <div className="flex items-center gap-3 rounded-[24px] bg-surface-container-low p-4 text-on-surface-variant shadow-[0_10px_22px_rgba(148,163,184,0.08)]">
          {user.avatar ? (
            <img alt={user.name} className="h-10 w-10 rounded-full object-cover" src={user.avatar} />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed font-bold text-primary">
              {user.initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-on-surface">{user.name}</p>
            <p className="truncate text-xs">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default WorkspaceSidebar
