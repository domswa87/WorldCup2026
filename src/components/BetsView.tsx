import { MOCK_MATCHES } from '../lib/mockMatches'

export function BetsView() {
  return (
    <div>
      <p>Bets</p>
      {MOCK_MATCHES.map((match) => (
        <p key={match.id}>
          {match.homeTeam} vs {match.awayTeam}
        </p>
      ))}
    </div>
  )
}
