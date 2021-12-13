import RoutingContext from '@//:modules/routing/RoutingContext'
import { useCallback, useContext } from 'react'

interface Props {
  children: JSX.Element
  disabled?: boolean
  to: string
}

/**
 * An alternative to react-router's Link component that works with
 * our custom RoutingContext.
 */
export default function Link ({
  children,
  disabled = false,
  to
}: Props): JSX.Element {
  const router = useContext(RoutingContext)

  // When the user clicks, change route
  const changeRoute = useCallback(
    event => {
      event.preventDefault()
      router.history.push(to)
    },
    [to, router]
  )

  // Callback to preload just the code for the route:
  // we pass this to onMouseEnter, which is a weaker signal
  // that the user *may* navigate to the route.
  const preloadRouteCode = useCallback(() => {
    router.preloadCode(to)
  }, [to, router])

  // Callback to preload the code and data for the route:
  // we pass this to onMouseDown, since this is a stronger
  // signal that the user will likely complete the navigation
  const preloadRoute = useCallback(() => {
    router.preload(to)
  }, [to, router])

  if (disabled) {
    return (
      <span>
        {children}
      </span>
    )
  }

  return (
    <a
      href={to}
      onClick={changeRoute}
      onMouseEnter={preloadRouteCode}
      onMouseDown={preloadRoute}
    >
      {children}
    </a>
  )
}
