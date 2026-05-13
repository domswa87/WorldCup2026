import type { ReactNode } from 'react'
import type { AppView } from '../navigation'
import { MOCK_MATCHES } from '../mockMatches'
import type { PredictionsMap } from '../predictionsStorage'
import type { ScorePrediction } from '../types'
import { AccountPage } from '../pages/AccountPage'
import { BetsPage } from '../pages/BetsPage'
import { ResultsPage } from '../pages/ResultsPage'
import { TablePage } from '../pages/TablePage'

/**
 * Maps `activeView` → page component and wraps it in `<main className="layout__content">`
 * (scroll region + primary landmark). No state — easy to swap for `react-router` later.
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
  let page: ReactNode
  switch (activeView) {
    case 'account':
      page = <AccountPage />
      break
    case 'bets':
      page = (
        <BetsPage
          matches={MOCK_MATCHES}
          now={now}
          predictions={predictions}
          onSavePrediction={onSavePrediction}
        />
      )
      break
    case 'results':
      page = <ResultsPage matches={MOCK_MATCHES} predictions={predictions} />
      break
    case 'table':
      page = <TablePage />
      break
  }

  return <main className="layout__content">{page}</main>
}
