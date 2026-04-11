import MaterialIcon from './MaterialIcon'

function ChatConversationsPane({ items }) {
  return (
    <section className="flex w-full flex-col bg-surface-container-low xl:w-80">
      <div className="p-6">
        <h2 className="font-headline text-xl font-bold tracking-tight text-on-surface">Messages</h2>
        <p className="mt-2 text-sm font-medium text-on-surface-variant">Active onboarding threads</p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-3 pb-6">
        {items.map((item) => (
          <button
            className={`flex w-full gap-4 rounded-xl p-4 text-left transition ${
              item.active
                ? 'bg-surface-container-lowest shadow-[0_8px_20px_rgba(148,163,184,0.16)]'
                : 'hover:bg-surface-container-high'
            }`}
            key={item.title}
            type="button"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                item.active ? 'bg-gradient-to-br from-primary to-primary-container text-white' : 'bg-surface-container-highest text-on-surface-variant'
              }`}
            >
              <MaterialIcon className="text-sm" name={item.icon} />
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className={`truncate text-sm ${item.active ? 'font-bold' : 'font-semibold'} text-on-surface`}>
                  {item.title}
                </span>
                <span className={`text-[10px] ${item.active ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>
                  {item.meta}
                </span>
              </div>
              <p className="truncate text-xs text-on-surface-variant">{item.preview}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-surface-container p-4">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-full bg-surface-container-highest px-4 py-3 font-semibold text-on-surface transition hover:bg-outline-variant/30"
          type="button"
        >
          <MaterialIcon className="text-sm" name="add" />
          <span>New Thread</span>
        </button>
      </div>
    </section>
  )
}

export default ChatConversationsPane
