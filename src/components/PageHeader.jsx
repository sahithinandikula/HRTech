import MaterialIcon from './MaterialIcon'

function PageHeader() {
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
          Good morning, Sarah
        </h2>
        <p className="mt-2 text-sm font-medium text-on-surface-variant sm:text-base">
          You have <span className="font-bold text-primary">26 pending</span> onboards this week.
          AI suggests prioritizing Alex Chen.
        </p>
      </div>

      <button
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-gradient-to-br from-primary to-primary-container px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:opacity-95"
        type="button"
      >
        <MaterialIcon className="text-[18px]" name="person_add" />
        New Hire
      </button>
    </div>
  )
}

export default PageHeader
