import { useState } from 'react'
import { MainNav } from '../components/layout/MainNav'
import type { AppView } from '../lib/navigation'
import { AppPages } from './AppPages'

export function Application() {
  const [activeView, setActiveView] = useState<AppView>('bets')

  return (
    <div className="layout">
      <p>World Cup Bet</p>
      <AppPages activeView={activeView} />
      <MainNav active={activeView} onSelect={setActiveView} />
    </div>
  )
}
