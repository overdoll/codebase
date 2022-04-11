import { useCallback, useTransition } from 'react'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../support/runIfFunction'
import { useRouter } from 'next/router'

export interface ChildrenCallableLink {
  isPending: boolean
}

export interface LinkProps {
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
  to
}: Props): JSX.Element {
  const router = useRouter()

  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 3000
  })

  // When the user clicks, change route
  const changeRoute = useCallback(
    event => {
      event.preventDefault()
      startTransition(() => {
        void router.push(to)
      })
    },
    [to, router]
  )

  // Callback to preload just the code for the route:
  // we pass this to onMouseEnter, which is a weaker signal
  // that the user *may* navigate to the route.
  const preloadRouteCode = useCallback(() => {
    void router.prefetch(to)
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
    >
      {runIfFunction(children, { isPending })}
    </a>
  )
}
