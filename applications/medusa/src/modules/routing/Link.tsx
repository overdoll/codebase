import { useRoutingContext } from './RoutingContext'
import { useCallback, useTransition } from 'react'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../support/runIfFunction'
import { HTMLChakraProps } from '@chakra-ui/react'

export interface ChildrenCallableLink {
  isPending: boolean
}

export interface LinkProps{
  children?: MaybeRenderProp<ChildrenCallableLink>
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
  to,
  ...rest
}: LinkProps): JSX.Element {
  const router = useRoutingContext()

  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 3000
  })

  // When the user clicks, change route
  const changeRoute = useCallback(
    event => {
      startTransition(() => {
        event.preventDefault()
        router.history.push(to)
      })
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

  if (disabled || isPending) {
    return (
      <span {...rest}>
        {runIfFunction(children, { isPending })}
      </span>
    )
  }

  return (
    <a
      href={to}
      onClick={changeRoute}
      onMouseEnter={preloadRouteCode}
      onMouseDown={preloadRoute}
      {...rest}
    >
      {runIfFunction(children, { isPending })}
    </a>
  )
}
