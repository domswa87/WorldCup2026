import type { ScorePrediction } from './types'

/**
 * `localStorage` is a simple key/value store in the browser.
 * - Survives refresh and closing the tab (same origin).
 * - Values are **strings** only → we `JSON.stringify` / `JSON.parse` objects.
 * - Not secret: anyone on the machine can read it. Fine for a friendly pool MVP.
 */
export const PREDICTIONS_STORAGE_KEY = 'worldcupbet.predictions.v1'

/** In-memory shape: some match ids may have no entry yet. */
export type PredictionsMap = Record<string, ScorePrediction | undefined>

/**
 * Narrow type guard: is this object a valid `{ home: number, away: number }`?
 * We use it so a corrupted `localStorage` value cannot crash the app.
 */
function isScorePrediction(value: unknown): value is ScorePrediction {
  if (value === null || typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  return (
    typeof o.home === 'number' &&
    typeof o.away === 'number' &&
    Number.isFinite(o.home) &&
    Number.isFinite(o.away)
  )
}

/**
 * Read saved predictions from `localStorage`.
 * On first visit (or parse error) returns `{}`.
 */
export function loadPredictions(): PredictionsMap {
  try {
    const raw = localStorage.getItem(PREDICTIONS_STORAGE_KEY)
    if (raw === null) return {}

    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }

    const out: PredictionsMap = {}
    for (const [matchId, value] of Object.entries(parsed)) {
      if (isScorePrediction(value)) {
        out[matchId] = { home: value.home, away: value.away }
      }
    }
    return out
  } catch {
    // Bad JSON or storage blocked (private mode quirks) → fail soft
    return {}
  }
}

/**
 * Persist all predictions. Entries with `undefined` are skipped so we do not
 * store empty keys.
 */
export function savePredictions(predictions: PredictionsMap): void {
  const compact: Record<string, ScorePrediction> = {}
  for (const [id, p] of Object.entries(predictions)) {
    if (p !== undefined) compact[id] = p
  }
  try {
    localStorage.setItem(PREDICTIONS_STORAGE_KEY, JSON.stringify(compact))
  } catch {
    // Quota exceeded or storage disabled — silently ignore for this MVP
  }
}
