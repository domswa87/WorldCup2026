import type { AppView } from '../navigation'
import { MOCK_MATCHES } from '../mockMatches'
import type { PredictionsMap } from '../predictionsStorage'
import type { ScorePrediction } from '../types'
import { AccountPage } from '../pages/AccountPage'
import { BetsPage } from '../pages/BetsPage'
import { ResultsPage } from '../pages/ResultsPage'
import { TablePage } from '../pages/TablePage'

/**
 * Maps `activeView` → page component. No state: easy to read and to swap for
 * real routes (`react-router`) later.
 */
type Props = {
  activeView: AppView
  now: Date
  predictions: PredictionsMap
  onSavePrediction: (matchId: string, prediction: ScorePrediction) => void
}

export function AppPages({
  activeView,
  now,
  predictions,
  onSavePrediction,
}: Props) {
  switch (activeView) {
    case 'account':
      return <AccountPage />
    case 'bets':
      return (
        <BetsPage
          matches={MOCK_MATCHES}
          now={now}
          predictions={predictions}
          onSavePrediction={onSavePrediction}
        />
      )
    case 'results':
      return <ResultsPage matches={MOCK_MATCHES} predictions={predictions} />
    case 'table':
      return <TablePage />
  }
}
