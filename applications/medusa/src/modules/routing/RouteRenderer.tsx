import { Suspense, useEffect, useState } from 'react'
import { useRoutingContext } from './RoutingContext'
import { PreparedEntry, RouterInit } from './router'
import ErrorBoundary from '../operations/ErrorBoundary'
import { chakra, Progress, Slide } from '@chakra-ui/react'
import { useRelayEnvironment } from 'react-relay'

/**
 * A component that accesses the current route entry from RoutingContext and renders
 * that entry.
 *
 * We want to also skip component rendering on the server-side
 */
export default function RouterRenderer (): JSX.Element {
  // Access the router
  const router = useRoutingContext()
  // Improve the route transition UX by delaying transitions: show the previous route entry
  // for a brief period while the next route is being prepared. See
  // https://reactjs.org/docs/concurrent-mode-patterns.html#transitions

  // Store the active entry in state - this allows the renderer to use features like
  // useTransition to delay when state changes become visible to the user.
  const [routeEntry, setRouteEntry] = useState<RouterInit>(router.get())

  // On mount subscribe for route changes
  useEffect(() => {
    // Check if the route has changed between the last render and commit:
    const currentEntry = router.get()
    if (currentEntry !== routeEntry) {
      // if there was a concurrent modification, rerender and exit
      setRouteEntry(currentEntry)
      return
    }

    // If there *wasn't* a concurrent change to the route, then the UI
    // is current: subscribe for subsequent route updates
    const dispose = router.subscribe(nextEntry => {
      // startTransition() delays the effect of the setRouteEntry (setState) call
      // for a brief period, continuing to show the old state while the new
      // state (route) is prepared.
      // TODO: transitions are buggy - getting rid of them for now
      setRouteEntry(nextEntry)
    })
    return () => dispose()

    // Note: this hook updates routeEntry manually; we exclude that variable
    // from the hook deps to avoid recomputing the effect after each change
    // triggered by the effect itself.
    // eslint-disable-next-line
  }, [router])

  // The current route value is an array of matching entries - one entry per
  // level of routes (to allow nested routes). We have to map each one to a
  // RouteComponent to allow suspending, and also pass its children correctly.
  // Conceptually, we want this structure:
  // ```
  // <RouteComponent
  //   component={entry[0].component}
  //   prepared={entry[0].prepared}>
  //   <RouteComponent
  //     component={entry[1].component}
  //     prepared={entry[1].prepared}>
  //       // continue for nested items...
  //   </RouteComponent>
  // </RouteComponent>
  // ```
  // To achieve this, we reverse the list so we can start at the bottom-most
  // component, and iteratively construct parent components w the previous
  // value as the child of the next one:
  const reversedItems: PreparedEntry[] = ([] as PreparedEntry[]).concat(routeEntry.entries).reverse() // reverse is in place, but we want a copy so concat

  const firstItem = reversedItems[0]

  // the bottom-most component is special since it will have no children
  // (though we could probably just pass null children to it)
  let routeComponent: JSX.Element = (
    <RouteComponent
      id={firstItem.id}
      component={firstItem.component}
      dependencies={firstItem.dependencies}
      prepared={firstItem.prepared}
      routeData={firstItem.routeData}
    />
  )
  for (let ii = 1; ii < reversedItems.length; ii++) {
    const nextItem = reversedItems[ii]
    routeComponent = (
      <RouteComponent
        id={nextItem.id}
        component={nextItem.component}
        prepared={nextItem.prepared}
        dependencies={nextItem.dependencies}
        routeData={nextItem.routeData}
      >
        {routeComponent}
      </RouteComponent>
    )
  }

  // Routes can error so wrap in an <ErrorBoundary>
  // Routes can suspend, so wrap in <Suspense>
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <chakra.div
          zIndex='banner'
          position='fixed'
          w='100%'
          top='0'
        >
          <Slide direction='top'>
            <Progress
              h='3px'
              borderRadius='none'
              hasStripe
              isAnimated
              colorScheme='primary'
              size='xs'
              value={100}
            />
          </Slide>
        </chakra.div>
      }
      >
        {routeComponent}
      </Suspense>
    </ErrorBoundary>
  )
}

/**
 * The `component` property from the route entry is a Resource, which may or may not be ready.
 * We use a helper child component to unwrap the resource with component.read(), and then
 * render it if its ready.
 *
 * NOTE: calling routeEntry.route.component.read() directly in RouteRenderer wouldn't work the
 * way we'd expect. Because that method could throw - either suspending or on error - the error
 * would bubble up to the *caller* of RouteRenderer. We want the suspend/error to bubble up to
 * our ErrorBoundary/Suspense components, so we have to ensure that the suspend/error happens
 * in a child component.
 */
function RouteComponent ({
  children,
  routeData,
  component,
  dependencies,
  prepared
}: PreparedEntry): JSX.Element {
  const environment = useRelayEnvironment()

  // make sure localization files are loaded
  if (dependencies != null) {
    dependencies.forEach(res => res.resource.read(environment))
  }

  const Component = component.read(environment)

  return (
    <Component
      routeData={routeData}
      prepared={prepared}
    >
      {children}
    </Component>
  )
}
