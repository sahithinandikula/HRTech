import MaterialIcon from './MaterialIcon'
import ProgressBar from './ProgressBar'
import SectionCard from './SectionCard'

function ProfileChecklistCard({ checklist }) {
  return (
    <SectionCard className="p-8">
      <div className="mb-10 flex items-center justify-between gap-4">
        <h3 className="font-headline text-lg font-bold text-on-surface">Onboarding Checklist</h3>
        <span className="font-bold text-primary">{checklist.completion}</span>
      </div>

      <div className="space-y-6">
        {checklist.items.map((item) => (
          <div className={`flex items-center gap-4 ${item.complete ? '' : 'opacity-60'}`} key={item.title}>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                item.complete
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-high text-outline'
              }`}
            >
              <MaterialIcon
                className={
                  item.complete ? "[font-variation-settings:'FILL'_1,'wght'_500,'GRAD'_0,'opsz'_24]" : ''
                }
                name={item.complete ? 'check_circle' : 'radio_button_unchecked'}
              />
            </div>
            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-on-surface">{item.title}</span>
                <span
                  className={`text-xs ${
                    item.complete ? 'text-on-surface-variant' : 'font-bold uppercase text-tertiary'
                  }`}
                >
                  {item.meta}
                </span>
              </div>
              <ProgressBar tone={item.complete ? 'success' : 'primary'} value={item.progress} />
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
        type="button"
      >
        {checklist.action}
        <MaterialIcon name="arrow_right_alt" />
      </button>
    </SectionCard>
  )
}

export default ProfileChecklistCard
