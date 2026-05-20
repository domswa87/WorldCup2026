import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { MOCK_MATCHES } from '../lib/mockMatches'

export function BetsView() {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Bets</Typography>
      {MOCK_MATCHES.map((match) => (
        <Typography key={match.id} variant="body2">
          {match.homeTeam} vs {match.awayTeam}
        </Typography>
      ))}
    </Stack>
  )
}
