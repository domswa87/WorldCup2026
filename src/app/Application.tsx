import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MainNav } from '../components/layout/MainNav'
import type { AppView } from '../lib/navigation'
import { AppPages } from './AppPages'

export function Application() {
  const [activeView, setActiveView] = useState<AppView>('bets')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Typography variant="h6" component="h1" sx={{ px: 2, py: 1.5 }}>
        World Cup Bet
      </Typography>
      <AppPages activeView={activeView} />
      <MainNav active={activeView} onSelect={setActiveView} />
    </Box>
  )
}
