import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { MAIN_TABS, type AppView } from '../../lib/navigation'

type Props = {
  active: AppView
  onSelect: (view: AppView) => void
}

export function MainNav({ active, onSelect }: Props) {
  return (
    <BottomNavigation
      value={active}
      onChange={(_, view) => onSelect(view as AppView)}
      showLabels
    >
      {MAIN_TABS.map(({ view, label }) => (
        <BottomNavigationAction key={view} value={view} label={label} />
      ))}
    </BottomNavigation>
  )
}
