/**
 * Domain types for the pool.
 * Keeping them in one file makes the data shape easy to find while learning.
 */

/** Official final score once the match is finished (from admin / API later). */
export type MatchResult = {
  home: number
  away: number
}

/**
 * One scheduled match.
 *
 * - `kickoff` is an ISO-8601 string (UTC with `Z` is clearest for APIs).
 * - `finalResult` is optional: when missing, we do not know the real score yet.
 */
export type Match = {
  id: string
  kickoff: string
  homeTeam: string
  awayTeam: string
  /** If set, we can verify predictions and award points. */
  finalResult?: MatchResult
}

/** What the user thinks the score will be before the match. */
export type ScorePrediction = {
  home: number
  away: number
}
