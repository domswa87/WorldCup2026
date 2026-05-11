import type { Match } from './types'

/**
 * World Cup pool rule (for this learning app):
 *
 * You may enter or change a prediction only **before** the match starts.
 * The browser compares the **device clock** (`now`) to the match `kickoff`
 * (ISO string in UTC from your data / API).
 *
 * Why not only `finalResult`?
 * - Real matches are "open for betting" until kickoff, then locked even before
 *   the final score exists in your database.
 *
 * @param kickoffIso - e.g. `"2026-06-12T15:00:00.000Z"`
 * @param now - typically `new Date()` from a hook that refreshes occasionally
 */
export function hasKickoffPassed(kickoffIso: string, now: Date): boolean {
  const kickoffMs = new Date(kickoffIso).getTime()
  return now.getTime() >= kickoffMs
}

/**
 * `true` when the user must not edit this match's prediction anymore.
 *
 * Two independent reasons:
 * 1. Kickoff time has passed → lock (even if we do not yet have `finalResult`).
 * 2. We already know the final score → show verification UI; inputs stay read-only.
 */
export function isPredictionReadOnly(match: Match, now: Date): boolean {
  if (match.finalResult !== undefined) return true
  return hasKickoffPassed(match.kickoff, now)
}
