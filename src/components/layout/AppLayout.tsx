import type { ReactNode } from 'react'
import type { AppView } from '../../navigation'
import { ClockDisplay } from '../ClockDisplay'
import { MainNav } from './MainNav'

type Props = {
  activeView: AppView
  onSelectView: (view: AppView) => void
  now: Date
  totalPoints: number
  children: ReactNode
}

/**
 * Shell: header (title, clock, points) + scrollable main + fixed bottom nav.
 * `children` is the current page — keeps layout separate from page logic.
 */
export function AppLayout({
  activeView,
  onSelectView,
  now,
  totalPoints,
  children,
}: Props) {
  return (
    <div className="layout">
      <header className="layout__header">
        <h1 className="layout__title">World Cup pool</h1>
        <p className="layout__tagline">
          Learning app — predictions stay in this browser until you add an API.
        </p>
        <ClockDisplay now={now} />
        <div className="layout__scoreboard" aria-live="polite">
          <span className="layout__scoreboard-label">Your points</span>
          <span className="layout__scoreboard-value">{totalPoints}</span>
        </div>
      </header>

      <main className="layout__content">{children}</main>

      <MainNav active={activeView} onSelect={onSelectView} />
    </div>
  )
}
