import { ReactNode } from 'react'
import { useRoutingContext } from './RoutingContext'

interface Props {
  children: ReactNode
}

export default function NotFound ({ children }: Props): JSX.Element {
  const router = useRoutingContext()

  // this will only run on the server
  if (router.staticContext != null) {
    router.staticContext.status = 404
  }

  return children as JSX.Element
}
