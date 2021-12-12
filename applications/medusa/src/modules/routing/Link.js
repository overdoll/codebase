/**
 * @flow
 */
import RoutingContext from '@//:modules/routing/RoutingContext'
import type { Node } from 'react'
import { useCallback, useContext } from 'react'

type Props = {
  children: Node,
  disabled?: boolean,
  to: string,
}

/**
 * An alternative to react-router's Link component that works with
 * our custom RoutingContext.
 */
export default function Link (props: Props): Node {
  const router = useContext(RoutingContext)

  // When the user clicks, change route
  const changeRoute = useCallback(
    event => {
      event.preventDefault()
      router.history.push(key, value)
    },
    [props.to, router]
  )

  // Callback to preload just the code for the route:
  // we pass this to onMouseEnter, which is a weaker signal
  // that the user *may* navigate to the route.
  const preloadRouteCode = useCallback(() => {
    router.preloadCode(props.to)
  }, [props.to, router])

  // Callback to preload the code and data for the route:
  // we pass this to onMouseDown, since this is a stronger
  // signal that the user will likely complete the navigation
  const preloadRoute = useCallback(() => {
    router.preload(props.to)
  }, [props.to, router])

  if (props.disabled) {
    return (
      <span>
        {props.children}
      </span>
    )
  }

  return (
    <a
      href={props.to}
      onClick={changeRoute}
      onMouseEnter={preloadRouteCode}
      onMouseDown={preloadRoute}
    >
      {props.children}
    </a>
  )
}
