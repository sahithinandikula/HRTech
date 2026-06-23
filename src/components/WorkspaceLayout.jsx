import WorkspaceSidebar from './WorkspaceSidebar'
import WorkspaceTopbar from './WorkspaceTopbar'

function WorkspaceLayout({ children, navItems, placeholder, user, topbarLabel, topbarBadge }) {
  return (
    <main className="min-h-screen bg-transparent text-on-surface">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:min-h-screen lg:flex-row">
        <WorkspaceSidebar items={navItems} user={user} />

        <div className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <WorkspaceTopbar badge={topbarBadge} label={topbarLabel} placeholder={placeholder} user={user} />
          <div className="space-y-8 pb-8 pt-8 sm:pt-10 animate-page-entry">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default WorkspaceLayout
