/**
 * Helpers for showing **current time** and **time until kickoff** in the user's
 * locale and time zone (`Intl` APIs read that from the browser/OS).
 */

const MS = {
  second: 1000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
} as const

/**
 * Wall clock for the header — updates whenever the parent passes a fresh `now`.
 * `second: '2-digit'` makes it obvious the page is "live".
 */
export function formatLocalClock(now: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)
}

/**
 * `RelativeTimeFormat` picks wording like "in 5 minutes" / "in 2 hours"
 * instead of you concatenating strings manually (better for translations).
 */
function relativeFormatter() {
  return new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
}

/**
 * While the kickoff is still in the future, returns a phrase such as
 * "in 12 minutes" describing how long bets can stay open.
 *
 * Returns `null` once `now` has reached kickoff — the UI should switch to the
 * locked state instead of showing a countdown.
 */
export function formatBetsClosingRelative(
  kickoffIso: string,
  now: Date,
): string | null {
  const remainingMs = new Date(kickoffIso).getTime() - now.getTime()
  if (remainingMs <= 0) return null

  const rtf = relativeFormatter()

  if (remainingMs >= MS.day) {
    const days = Math.max(1, Math.round(remainingMs / MS.day))
    return rtf.format(days, 'day')
  }
  if (remainingMs >= MS.hour) {
    const hours = Math.max(1, Math.round(remainingMs / MS.hour))
    return rtf.format(hours, 'hour')
  }
  if (remainingMs >= MS.minute) {
    const minutes = Math.max(1, Math.round(remainingMs / MS.minute))
    return rtf.format(minutes, 'minute')
  }
  const seconds = Math.max(1, Math.round(remainingMs / MS.second))
  return rtf.format(seconds, 'second')
}

/**
 * After kickoff, a short "how long ago" phrase (e.g. "2 hours ago") for context
 * on locked cards that do not yet have a final score loaded.
 */
export function formatKickoffWasRelative(
  kickoffIso: string,
  now: Date,
): string | null {
  const elapsedMs = now.getTime() - new Date(kickoffIso).getTime()
  if (elapsedMs <= 0) return null

  const rtf = relativeFormatter()

  if (elapsedMs >= MS.day) {
    const days = Math.max(1, Math.round(elapsedMs / MS.day))
    return rtf.format(-days, 'day')
  }
  if (elapsedMs >= MS.hour) {
    const hours = Math.max(1, Math.round(elapsedMs / MS.hour))
    return rtf.format(-hours, 'hour')
  }
  if (elapsedMs >= MS.minute) {
    const minutes = Math.max(1, Math.round(elapsedMs / MS.minute))
    return rtf.format(-minutes, 'minute')
  }
  const seconds = Math.max(1, Math.round(elapsedMs / MS.second))
  return rtf.format(-seconds, 'second')
}
