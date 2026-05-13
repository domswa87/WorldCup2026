import { ClockDisplay } from '../ClockDisplay'

type Props = {
  now: Date
  totalPoints: number
}

/** Title, tagline, local clock, and points — top chrome of the app shell. */
export function AppHeader({ now, totalPoints }: Props) {
  return (
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
  )
}
