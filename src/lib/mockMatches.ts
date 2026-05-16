import type { Match } from './types'

/**
 * Temporary in-memory schedule.
 * Replace this array with `fetch()` results when you add a backend.
 *
 * Tip: keep `kickoff` in UTC (`...Z`) in data; the UI formats it in the user's locale.
 */
export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    kickoff: '2026-05-11T15:15:00.000Z',
    homeTeam: 'Mexico',
    awayTeam: 'South Africa',
    //finalResult: { home: 2, away: 1 },
  },
  {
    id: 'm2',
    kickoff: '2026-05-11T14:13:00.000Z',
    homeTeam: 'South Korea',
    awayTeam: 'Germany',
  },
  {
    id: 'm3',
    kickoff: '2026-05-11T16:25:00.000Z',
    homeTeam: 'Spain',
    awayTeam: 'England',
    //finalResult: { home: 1, away: 1 },
  },
  {
    id: 'm4',
    kickoff: '2026-05-12T16:15:00.000Z',
    homeTeam: 'Belgium',
    awayTeam: 'Egypt',
  },
  {
    id: 'm5',
    kickoff: '2026-05-13T16:15:00.000Z',
    homeTeam: 'Netherlands',
    awayTeam: 'Japan',
  },
]
