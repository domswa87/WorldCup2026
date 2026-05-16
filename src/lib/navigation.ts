/**
 * Which screen is visible. We use a string union instead of react-router
 * so the project stays small — you can swap to real routes later.
 */
export type AppView = 'account' | 'bets' | 'results' | 'table'

/** Single source of truth for tab order and labels. */
export const MAIN_TABS: { view: AppView; label: string }[] = [
  { view: 'account', label: 'Account' },
  { view: 'bets', label: 'Bets' },
  { view: 'results', label: 'Results' },
  { view: 'table', label: 'Table' },
]
