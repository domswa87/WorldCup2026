import { useEffect, useState } from 'react'

const TICK_MS = 1000

/**
 * Live `Date` for the header clock, countdowns, and kickoff locking.
 * Keeps `Application` free of interval/timer details.
 */
export function useNow(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), TICK_MS)
    return () => window.clearInterval(id)
  }, [])

  return now
}
