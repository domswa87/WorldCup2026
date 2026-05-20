import Box from '@mui/material/Box'
import type { AppView } from '../lib/navigation'
import { AccountView } from '../components/AccountView'
import { BetsView } from '../components/BetsView'
import { ResultsView } from '../components/ResultsView'
import { TableView } from '../components/TableView'

type Props = {
  activeView: AppView
}

export function AppPages({ activeView }: Props) {
  let page
  if (activeView === 'account') page = <AccountView />
  else if (activeView === 'bets') page = <BetsView />
  else if (activeView === 'results') page = <ResultsView />
  else page = <TableView />

  return (
    <Box component="main" sx={{ flex: 1, overflow: 'auto', px: 2, py: 2 }}>
      {page}
    </Box>
  )
}
