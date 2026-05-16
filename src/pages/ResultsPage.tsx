import { scorePrediction } from '../lib/scoring'
import type { Match } from '../lib/types'
import type { PredictionsMap } from '../lib/predictionsStorage'

type Props = {
  matches: Match[]
  predictions: PredictionsMap
}

/**
 * Lists finished matches only. Pure: all data comes from props.
 */
export function ResultsPage({ matches, predictions }: Props) {
  const finished = matches.filter((m) => m.finalResult !== undefined)

  return (
    <section className="page">
      <h2 className="page__title">Results</h2>
      {finished.length === 0 ? (
        <p className="page__text">No finished matches in the mock data yet.</p>
      ) : (
        <ul className="result-list">
          {finished.map((m) => {
            const pred = predictions[m.id]
            const fr = m.finalResult!
            const line = pred
              ? scorePrediction(pred, fr)
              : null
            return (
              <li key={m.id} className="result-row">
                <div className="result-row__teams">
                  {m.homeTeam} vs {m.awayTeam}
                </div>
                <div className="result-row__score">
                  Final: {fr.home}–{fr.away}
                </div>
                <div className="result-row__you">
                  {pred ? (
                    <>
                      Your pick: {pred.home}–{pred.away}
                      {line && (
                        <span className="result-row__pts">
                          {' '}
                          → {line.points} pt{line.points === 1 ? '' : 's'}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="result-row__miss">No prediction saved</span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
