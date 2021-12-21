import { useRoutingContext } from './RoutingContext'
import { useEffect } from 'react'
import CanUseDOM from '../operations/CanUseDOM'

interface Props {
  to: string
}

export default function Redirect ({
  to
}: Props): null {
  const router = useRoutingContext()

  // on the server, do a sync redirect
  if (!CanUseDOM) {
    router.history.push(to)
    return null
  }

  // redirect works with our preload
  useEffect(() => {
    router.preload(to)
    router.history.push(to)
  }, [to, router])

  return null
}
