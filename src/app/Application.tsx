import { useEffect, useMemo, useState } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { useNow } from '../hooks/useNow'
import type { AppView } from '../navigation'
import { MOCK_MATCHES } from '../mockMatches'
import {
  loadPredictions,
  savePredictions,
  type PredictionsMap,
} from '../predictionsStorage'
import { sumPoolPoints } from '../poolMath'
import type { ScorePrediction } from '../types'

/**
 * `src/app/` — application shell: state, side effects, wiring layout + pages.
 * Entry file `App.tsx` only mounts this so the project structure stays obvious.
 */
export function Application() {
  const now = useNow()

  const [activeView, setActiveView] = useState<AppView>('bets')

  const [predictions, setPredictions] = useState<PredictionsMap>(() =>
    loadPredictions(),
  )

  useEffect(() => {
    savePredictions(predictions)
  }, [predictions])

  const pointsTotal = useMemo(
    () => sumPoolPoints(MOCK_MATCHES, predictions),
    [predictions],
  )

  function savePrediction(matchId: string, prediction: ScorePrediction) {
    setPredictions((prev) => ({ ...prev, [matchId]: prediction }))
  }

  return (
    <AppLayout
      activeView={activeView}
      onSelectView={setActiveView}
      now={now}
      totalPoints={pointsTotal}
      predictions={predictions}
      onSavePrediction={savePrediction}
    />
  )
}
