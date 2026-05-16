export type AppView = 'account' | 'bets' | 'results' | 'table'

export const MAIN_TABS: { view: AppView; label: string }[] = [
  { view: 'account', label: 'Account' },
  { view: 'bets', label: 'Bets' },
  { view: 'results', label: 'Results' },
  { view: 'table', label: 'Table' },
]
