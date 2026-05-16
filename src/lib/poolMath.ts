import type { Match } from './types.ts'
import type { PredictionsMap } from './predictionsStorage.ts'
import { scorePrediction } from './scoring.ts'

/** Sum points for matches that already have a final score. */
export function sumPoolPoints(matches: Match[], predictions: PredictionsMap): number {
  let sum = 0
  for (const m of matches) {
    if (!m.finalResult) continue
    const p = predictions[m.id]
    if (!p) continue
    sum += scorePrediction(p, m.finalResult).points
  }
  return sum
}
