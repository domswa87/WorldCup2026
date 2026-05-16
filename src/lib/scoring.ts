import type { MatchResult, ScorePrediction } from './types'

/**
 * "Outcome" ignores exact goals: only who wins or if it is a draw.
 * Useful when you award partial points for the right winner without exact score.
 */
export type Outcome = 'home' | 'draw' | 'away'

/** Map a scoreline to home win / draw / away win. */
export function outcomeFromScore(home: number, away: number): Outcome {
  if (home > away) return 'home'
  if (home < away) return 'away'
  return 'draw'
}

/**
 * Discriminated union: `kind` tells you *why* the user got those points.
 * TypeScript can narrow `kind` in `if`/`switch` for safe UI text.
 */
export type PointsBreakdown =
  | { points: 3; kind: 'exact' }
  | { points: 1; kind: 'outcome' }
  | { points: 0; kind: 'miss' }

/**
 * Scoring rules for this app (simple and easy to explain):
 *
 * 1. Exact score → 3 points
 * 2. Else if correct outcome (home / draw / away) → 1 point
 * 3. Else → 0
 *
 * Later you might move this to the server so scores cannot be tampered with.
 */
export function scorePrediction(
  prediction: ScorePrediction,
  finalResult: MatchResult,
): PointsBreakdown {
  if (
    prediction.home === finalResult.home &&
    prediction.away === finalResult.away
  ) {
    return { points: 3, kind: 'exact' }
  }
  if (
    outcomeFromScore(prediction.home, prediction.away) ===
    outcomeFromScore(finalResult.home, finalResult.away)
  ) {
    return { points: 1, kind: 'outcome' }
  }
  return { points: 0, kind: 'miss' }
}
