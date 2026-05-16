import { useEffect, useState } from 'react'
import type { Match, ScorePrediction } from '../lib/types'
import { scorePrediction } from '../lib/scoring'
import {
  formatBetsClosingRelative,
  formatKickoffWasRelative,
} from '../lib/timeDisplay'

const kickoffFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

type MatchCardProps = {
  match: Match
  now: Date
  saved?: ScorePrediction
  readOnly: boolean
  onSave: (matchId: string, prediction: ScorePrediction) => void
}

/**
 * The two inputs are plain text while the user types.
 * We only turn them into numbers when they press Save (see `parseGoalText`).
 */
type ScoreDraft = {
  homeText: string
  awayText: string
}

/**
 * Parent owns the real saved prediction. This card keeps a local copy in text
 * fields so typing does not hit `localStorage` on every keypress.
 *
 * This function is the only place that decides "what should the inputs show
 * when we load / when saved data changes?".
 */
function draftFromSaved(saved: ScorePrediction | undefined): ScoreDraft {
  if (saved === undefined) {
    return { homeText: '', awayText: '' }
  }
  return {
    homeText: String(saved.home),
    awayText: String(saved.away),
  }
}

/**
 * Turn one input box into a goal count, or `null` if the user has not entered
 * a valid number yet.
 */
function parseGoalText(text: string): number | null {
  const trimmed = text.trim()
  if (trimmed === '') {
    return null
  }
  const n = Number.parseInt(trimmed, 10)
  if (Number.isNaN(n)) {
    return null
  }
  if (n < 0 || n > 20) {
    return null
  }
  return n
}

export function MatchCard({ match, now, saved, readOnly, onSave }: MatchCardProps) {
  const [draft, setDraft] = useState<ScoreDraft>(() => draftFromSaved(saved))

  useEffect(() => {
    setDraft(draftFromSaved(saved))
  }, [saved, match.id])

  const matchIsFinished = match.finalResult !== undefined

  const homeGoals = parseGoalText(draft.homeText)
  const awayGoals = parseGoalText(draft.awayText)
  const userEnteredTwoValidGoals = homeGoals !== null && awayGoals !== null

  const canClickSave =
    !readOnly && !matchIsFinished && userEnteredTwoValidGoals

  const pointsBreakdown =
    matchIsFinished && saved && match.finalResult
      ? scorePrediction(saved, match.finalResult)
      : null

  const closingPhrase = formatBetsClosingRelative(match.kickoff, now)
  const kickoffAgoPhrase = formatKickoffWasRelative(match.kickoff, now)

  function setHomeDigits(value: string) {
    const digitsOnly = value.replace(/\D/g, '')
    setDraft((previous) => ({ ...previous, homeText: digitsOnly }))
  }

  function setAwayDigits(value: string) {
    const digitsOnly = value.replace(/\D/g, '')
    setDraft((previous) => ({ ...previous, awayText: digitsOnly }))
  }

  function handleSaveClick() {
    if (homeGoals === null || awayGoals === null) {
      return
    }
    onSave(match.id, { home: homeGoals, away: awayGoals })
  }

  return (
    <article className="match-card">
      <header className="match-card__meta">
        <time dateTime={match.kickoff}>
          {kickoffFormatter.format(new Date(match.kickoff))}
        </time>
        {matchIsFinished && match.finalResult && (
          <span className="match-card__final" aria-label="Final score">
            FT {match.finalResult.home}–{match.finalResult.away}
          </span>
        )}
        {!matchIsFinished && !readOnly && (
          <span className="match-card__badge match-card__badge--open">Open</span>
        )}
        {!matchIsFinished && readOnly && (
          <span className="match-card__badge match-card__badge--locked">Locked</span>
        )}
      </header>

      {!matchIsFinished && !readOnly && closingPhrase && (
        <p className="match-card__countdown">
          <span className="match-card__countdown-label">Bets close</span>{' '}
          <span className="match-card__countdown-value">{closingPhrase}</span>
        </p>
      )}

      <div className="match-card__teams">
        <span className="match-card__team match-card__team--home">
          {match.homeTeam}
        </span>
        <span className="match-card__vs">vs</span>
        <span className="match-card__team match-card__team--away">
          {match.awayTeam}
        </span>
      </div>

      <div className="match-card__predict">
        <label className="match-card__label">
          <span className="visually-hidden">{match.homeTeam} goals</span>
          <input
            className="match-card__input"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            disabled={readOnly}
            value={draft.homeText}
            onChange={(event) => setHomeDigits(event.target.value)}
            aria-label={`Predicted goals for ${match.homeTeam}`}
            placeholder="0"
          />
        </label>
        <span className="match-card__dash" aria-hidden>
          –
        </span>
        <label className="match-card__label">
          <span className="visually-hidden">{match.awayTeam} goals</span>
          <input
            className="match-card__input"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            disabled={readOnly}
            value={draft.awayText}
            onChange={(event) => setAwayDigits(event.target.value)}
            aria-label={`Predicted goals for ${match.awayTeam}`}
            placeholder="0"
          />
        </label>
      </div>

      {readOnly && !matchIsFinished && (
        <p className="match-card__hint match-card__hint--lock">
          Kickoff was {kickoffAgoPhrase ?? 'moments ago'} — your saved pick (if any) stays
          as-is until we add live scores.
        </p>
      )}

      {!readOnly && !matchIsFinished && (
        <button
          type="button"
          className="match-card__save"
          disabled={!canClickSave}
          onClick={handleSaveClick}
        >
          Save prediction
        </button>
      )}

      {matchIsFinished && (
        <div className="match-card__result" role="status">
          {!saved && <p className="match-card__hint">No prediction saved.</p>}
          {saved && pointsBreakdown && (
            <p>
              Your pick: {saved.home}–{saved.away}
              {pointsBreakdown.points > 0 ? (
                <>
                  {' '}
                  · <strong>+{pointsBreakdown.points} pts</strong>
                  {pointsBreakdown.kind === 'exact'
                    ? ' (exact score)'
                    : ' (right result)'}
                </>
              ) : (
                <> · 0 pts</>
              )}
            </p>
          )}
        </div>
      )}
    </article>
  )
}
