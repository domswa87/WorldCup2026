type Match = {
  id: string
  kickoff: string
  homeTeam: string
  awayTeam: string
}

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    kickoff: '2026-05-15T15:15:00.000Z',
    homeTeam: 'Mexico',
    awayTeam: 'South Africa',
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
