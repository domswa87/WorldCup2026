import { useEffect, useState } from 'react'

const TICK_MS = 60_000

/**
 * Current `Date`, refreshed once per minute for the header clock, relative
 * kickoff phrases, and read-only prediction locking. Kickoff lock can lag by
 * up to one tick vs real time.
 */
export function useNow(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), TICK_MS)
    return () => window.clearInterval(id)
  }, [])

  return now
}
