import type { AppView } from '../lib/navigation'
import { AccountView } from '../components/AccountView'
import { BetsView } from '../components/BetsView'
import { ResultsView } from '../components/ResultsView'
import { TableView } from '../components/TableView'

type Props = {
  activeView: AppView
}

export function AppPages({ activeView }: Props) {
  if (activeView === 'account') return <main className="layout__content"><AccountView /></main>
  if (activeView === 'bets') return <main className="layout__content"><BetsView /></main>
  if (activeView === 'results') return <main className="layout__content"><ResultsView /></main>
  return <main className="layout__content"><TableView /></main>
}
