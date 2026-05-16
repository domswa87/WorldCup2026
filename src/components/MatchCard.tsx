import { useEffect, useState } from 'react'
import type { Match, ScorePrediction } from '../lib/types'
import { scorePrediction } from '../lib/scoring'
import {
  formatBetsClosingRelative,
  formatKickoffWasRelative,
} from '../lib/timeDisplay'

/**
 * `Intl.DateTimeFormat` turns a `Date` into a human string using the user's
 * locale and time zone (good for mobile users traveling).
 */
const kickoffFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

type MatchCardProps = {
  match: Match
  /** Same `Date` instance as the header clock — drives countdown + lock timing. */
  now: Date
  /** Last saved prediction for this match, if any. */
  saved?: ScorePrediction
  /**
   * When `true`, inputs cannot change and the save button is hidden.
   * Parent computes this from **current time vs kickoff** (and final results).
   */
  readOnly: boolean
  /** Called when the user confirms a new prediction (only while editable). */
  onSave: (matchId: string, prediction: ScorePrediction) => void
}

/**
 * Parse a score input string into a non-negative integer, or `null` if empty/invalid.
 * We keep inputs as strings in React state so the user can clear the field.
 */
function parseScore(raw: string): number | null {
  if (raw.trim() === '') return null
  const n = Number.parseInt(raw, 10)
  if (!Number.isFinite(n) || n < 0 || n > 20) return null
  return n
}

/**
 * One row/card in the schedule list.
 *
 * State split:
 * - `saved` comes from the parent (global + `localStorage`) — "source of truth".
 * - `homeRaw` / `awayRaw` are local drafts so typing does not write to disk on every keypress.
 */
export function MatchCard({ match, now, saved, readOnly, onSave }: MatchCardProps) {
  const [homeRaw, setHomeRaw] = useState(() =>
    saved !== undefined ? String(saved.home) : '',
  )
  const [awayRaw, setAwayRaw] = useState(() =>
    saved !== undefined ? String(saved.away) : '',
  )

  /**
   * When `saved` changes from outside (e.g. after reload), sync the draft fields.
   * Dependency array lists values this effect "subscribes" to.
   */
  useEffect(() => {
    setHomeRaw(saved !== undefined ? String(saved.home) : '')
    setAwayRaw(saved !== undefined ? String(saved.away) : '')
  }, [saved, match.id])

  /** We have an official result → show points breakdown. */
  const hasFinalScore = match.finalResult !== undefined

  const homeGoals = parseScore(homeRaw)
  const awayGoals = parseScore(awayRaw)

  /** User can save only when allowed to edit and both sides are valid numbers. */
  const canSave =
    !readOnly && !hasFinalScore && homeGoals !== null && awayGoals !== null

  const pointsBreakdown =
    hasFinalScore && saved && match.finalResult
      ? scorePrediction(saved, match.finalResult)
      : null

  /** Shown only while bets are still open — see `formatBetsClosingRelative`. */
  const closingPhrase = formatBetsClosingRelative(match.kickoff, now)
  /** Shown on locked cards before a final exists — how long since kickoff. */
  const kickoffAgoPhrase = formatKickoffWasRelative(match.kickoff, now)

  return (
    <article className="match-card">
      <header className="match-card__meta">
        <time dateTime={match.kickoff}>
          {kickoffFormatter.format(new Date(match.kickoff))}
        </time>
        {hasFinalScore && match.finalResult && (
          <span className="match-card__final" aria-label="Final score">
            FT {match.finalResult.home}–{match.finalResult.away}
          </span>
        )}
        {!hasFinalScore && !readOnly && (
          <span className="match-card__badge match-card__badge--open">Open</span>
        )}
        {!hasFinalScore && readOnly && (
          <span className="match-card__badge match-card__badge--locked">Locked</span>
        )}
      </header>

      {!hasFinalScore && !readOnly && closingPhrase && (
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
            value={homeRaw}
            onChange={(e) => setHomeRaw(e.target.value.replace(/\D/g, ''))}
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
            value={awayRaw}
            onChange={(e) => setAwayRaw(e.target.value.replace(/\D/g, ''))}
            aria-label={`Predicted goals for ${match.awayTeam}`}
            placeholder="0"
          />
        </label>
      </div>

      {readOnly && !hasFinalScore && (
        <p className="match-card__hint match-card__hint--lock">
          Kickoff was {kickoffAgoPhrase ?? 'moments ago'} — your saved pick (if any) stays
          as-is until we add live scores.
        </p>
      )}

      {!readOnly && !hasFinalScore && (
        <button
          type="button"
          className="match-card__save"
          disabled={!canSave}
          onClick={() => {
            if (homeGoals !== null && awayGoals !== null) {
              onSave(match.id, { home: homeGoals, away: awayGoals })
            }
          }}
        >
          Save prediction
        </button>
      )}

      {hasFinalScore && (
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
