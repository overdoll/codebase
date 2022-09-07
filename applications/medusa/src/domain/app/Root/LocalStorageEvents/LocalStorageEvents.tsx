import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import differenceInHours from 'date-fns/differenceInHours'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

export default function LocalStorageEvents (): JSX.Element {
  const [lastVisited, setLastVisited] = useLocalStorage<null | number>('lastVisited', null)
  const currentTime = Date.now()
  const currentDate = new Date(currentTime)

  useEffect(() => {
    // if the user never visited or the local storage value doesn't exist, we create one
    if (lastVisited == null) {
      setLastVisited(currentTime)
      return
    }
    const lastVisitedDate = new Date(lastVisited)
    const hoursLastVisited = differenceInHours(currentDate, lastVisitedDate)
    const minutesLastVisited = differenceInHours(currentDate, lastVisitedDate)
    // if user hasn't visited the site in over 12 hours, we log it as a repeat visit and set the last visited date to now
    if (hoursLastVisited >= 12) {
      trackFathomEvent('65EC8I7Z', 1)
    } else if (hoursLastVisited >= 6) {
      trackFathomEvent('XYFKLU6P', 1)
    } else if (hoursLastVisited >= 3) {
      trackFathomEvent('HGACAG8L', 1)
    } else if (minutesLastVisited >= 45) {
      trackFathomEvent('BODBUS7T', 1)
    }
    setLastVisited(currentTime)
  }, [])

  return <></>
}
