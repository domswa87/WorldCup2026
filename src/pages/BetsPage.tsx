import { MatchCard } from '../components/MatchCard'
import { isPredictionReadOnly } from '../lib/matchTiming'
import type { Match, ScorePrediction } from '../lib/types'
import type { PredictionsMap } from '../lib/predictionsStorage'

type Props = {
  matches: Match[]
  now: Date
  predictions: PredictionsMap
  onSavePrediction: (matchId: string, prediction: ScorePrediction) => void
}

/**
 * Only the match list. State (`predictions`, `now`) lives in `App` and is passed
 * in as props — this file stays hook-free.
 */
export function BetsPage({ matches, now, predictions, onSavePrediction }: Props) {
  return (
    <section className="page">
      <h2 className="page__title">Bets</h2>
      <p className="page__text page__text--tight">
        Enter a score and tap save. Bets lock when kickoff time passes.
      </p>
      <ul className="match-list">
        {matches.map((match) => (
          <li key={match.id}>
            <MatchCard
              match={match}
              now={now}
              saved={predictions[match.id]}
              readOnly={isPredictionReadOnly(match, now)}
              onSave={onSavePrediction}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
