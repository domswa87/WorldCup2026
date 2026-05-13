import type { AppView } from '../../navigation'
import { AppPages } from '../../app/AppPages'
import type { PredictionsMap } from '../../predictionsStorage'
import type { ScorePrediction } from '../../types'
import { AppHeader } from './AppHeader'
import { MainNav } from './MainNav'

type Props = {
  activeView: AppView
  onSelectView: (view: AppView) => void
  now: Date
  totalPoints: number
  predictions: PredictionsMap
  onSavePrediction: (matchId: string, prediction: ScorePrediction) => void
}

/**
 * Full app chrome: header → routed pages (`AppPages`) → bottom nav.
 * No slot props — the main column is always `AppPages` so this file reads
 * top-to-bottom like the UI.
 */
export function AppLayout({
  activeView,
  onSelectView,
  now,
  totalPoints,
  predictions,
  onSavePrediction,
}: Props) {
  return (
    <div className="layout">
      <AppHeader now={now} totalPoints={totalPoints} />

      <AppPages
        activeView={activeView}
        now={now}
        predictions={predictions}
        onSavePrediction={onSavePrediction}
      />

      <MainNav active={activeView} onSelect={onSelectView} />
    </div>
  )
}
