import { formatLocalClock } from '../lib/timeDisplay'

/** Shows `now` — no hooks; parent owns the ticking `Date`. */
type Props = { now: Date }

export function ClockDisplay({ now }: Props) {
  return (
    <p className="layout__clock">
      <span className="layout__clock-label">Your time</span>
      <time className="layout__clock-value" dateTime={now.toISOString()}>
        {formatLocalClock(now)}
      </time>
    </p>
  )
}
