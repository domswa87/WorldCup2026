import { useEffect, useMemo, useState } from 'react'
import { AppHeader } from '../components/layout/AppHeader'
import { MainNav } from '../components/layout/MainNav'
import { useNow } from '../hooks/useNow'
import type { AppView } from '../lib/navigation'
import { MOCK_MATCHES } from '../lib/mockMatches'
import {
  loadPredictions,
  savePredictions,
  type PredictionsMap,
} from '../lib/predictionsStorage'
import { sumPoolPoints } from '../lib/poolMath'
import type { ScorePrediction } from '../lib/types'
import { AppPages } from './AppPages'

/**
 * Root UI: predictions, tab state, persistence, header, routed pages, nav.
 * Vite mounts this via `App.tsx`.
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
    <div className="layout">
      <AppHeader now={now} totalPoints={pointsTotal} />

      <AppPages
        activeView={activeView}
        now={now}
        predictions={predictions}
        onSavePrediction={savePrediction}
      />

      <MainNav active={activeView} onSelect={setActiveView} />
    </div>
  )
}
