import { MAIN_TABS, type AppView } from '../../lib/navigation'

type Props = {
  active: AppView
  onSelect: (view: AppView) => void
}

/**
 * Bottom tabs — only buttons + CSS. No state here: parent tells us `active`
 * and we call `onSelect` when the user taps a tab.
 */
export function MainNav({ active, onSelect }: Props) {
  return (
    <nav className="main-nav" aria-label="Main sections">
      {MAIN_TABS.map(({ view, label }) => (
        <button
          key={view}
          type="button"
          className={
            'main-nav__btn' + (active === view ? ' main-nav__btn--active' : '')
          }
          aria-current={active === view ? 'page' : undefined}
          onClick={() => onSelect(view)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
