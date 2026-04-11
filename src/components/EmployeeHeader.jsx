import MaterialIcon from './MaterialIcon'

function EmployeeHeader({ profile }) {
  return (
    <section className="grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative">
          <div className="h-48 w-48 overflow-hidden rounded-[30px] shadow-[0_24px_50px_rgba(25,28,30,0.18)]">
            <img alt={profile.name} className="h-full w-full object-cover" src={profile.photo} />
          </div>
          <div className="absolute -bottom-4 -right-4 rounded-full border-4 border-surface bg-secondary-fixed p-3 text-on-secondary-fixed shadow-lg">
            <MaterialIcon
              className="[font-variation-settings:'FILL'_1,'wght'_500,'GRAD'_0,'opsz'_24]"
              name="verified"
            />
          </div>
        </div>

        <div>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
            {profile.name}
          </h2>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-lg font-medium text-on-surface-variant">
            <span>{profile.title}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-outline-variant" />
            <span>{profile.joined}</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-sm font-medium text-on-surface">
              {profile.team}
            </span>
            <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-sm font-medium text-on-surface">
              {profile.location}
            </span>
            <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-sm font-medium text-on-surface">
              Last active: {profile.lastActive}
            </span>
            <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-sm font-medium text-on-surface">
              {profile.questionsAsked} questions asked
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-container px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:opacity-95"
          type="button"
        >
          <MaterialIcon name="mail" />
          Message Employee
        </button>
        <div className="flex gap-3">
          <button
            className="flex-1 rounded-full bg-surface-container-high px-6 py-3 font-medium text-on-surface transition hover:bg-surface-container-highest"
            type="button"
          >
            <span className="inline-flex items-center gap-2">
              <MaterialIcon name="edit" />
              Edit
            </span>
          </button>
          <button
            className="flex-1 rounded-full bg-surface-container-high px-6 py-3 font-medium text-on-surface transition hover:bg-surface-container-highest"
            type="button"
          >
            <span className="inline-flex items-center gap-2">
              <MaterialIcon name="description" />
              Docs
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default EmployeeHeader
