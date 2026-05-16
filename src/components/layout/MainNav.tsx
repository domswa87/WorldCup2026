import { MAIN_TABS, type AppView } from '../../lib/navigation'

type Props = {
  active: AppView
  onSelect: (view: AppView) => void
}

export function MainNav({ active, onSelect }: Props) {
  return (
    <nav className="main-nav">
      {MAIN_TABS.map(({ view, label }) => (
        <button
          key={view}
          type="button"
          onClick={() => onSelect(view)}
        >
          {label}
          {active === view ? ' (active)' : ''}
        </button>
      ))}
    </nav>
  )
}
