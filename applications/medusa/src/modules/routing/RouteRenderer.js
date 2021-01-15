import {
  useContext,
  useEffect,
  unstable_useTransition as useTransition,
  Suspense,
  useState,
} from 'react';
import RoutingContext from '@//:modules/routing/RoutingContext';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import '@//:modules/routing/RouteRenderer.css';
import { usePreloadedQuery } from 'react-relay/hooks';

const SUSPENSE_CONFIG = { timeoutMs: 2000 };

/**
 * A component that accesses the current route entry from RoutingContext and renders
 * that entry.
 *
 * We want to also skip component rendering on the server-side
 */
export default function RouterRenderer({ preloadQueries = false }) {
  // Access the router
  const router = useContext(RoutingContext);
  // Improve the route transition UX by delaying transitions: show the previous route entry
  // for a brief period while the next route is being prepared. See
  // https://reactjs.org/docs/concurrent-mode-patterns.html#transitions
  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);

  // Store the active entry in state - this allows the renderer to use features like
  // useTransition to delay when state changes become visible to the user.
  const [routeEntry, setRouteEntry] = useState(router.get());

  // On mount subscribe for route changes
  useEffect(() => {
    // Check if the route has changed between the last render and commit:
    const currentEntry = router.get();
    if (currentEntry !== routeEntry) {
      // if there was a concurrent modification, rerender and exit
      setRouteEntry(currentEntry);
      return;
    }

    // If there *wasn't* a concurrent change to the route, then the UI
    // is current: subscribe for subsequent route updates
    const dispose = router.subscribe(nextEntry => {
      // startTransition() delays the effect of the setRouteEntry (setState) call
      // for a brief period, continuing to show the old state while the new
      // state (route) is prepared.
      startTransition(() => {
        setRouteEntry(nextEntry);
      });
    });
    return () => dispose();

    // Note: this hook updates routeEntry manually; we exclude that variable
    // from the hook deps to avoid recomputing the effect after each change
    // triggered by the effect itself.
    // eslint-disable-next-line
  }, [router, startTransition]);

  // The current route value is an array of matching entries - one entry per
  // level of routes (to allow nested routes). We have to map each one to a
  // RouteComponent to allow suspending, and also pass its children correctly.
  // Conceptually, we want this structure:
  // ```
  // <RouteComponent
  //   component={entry[0].component}
  //   prepared={entrry[0].prepared}>
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
  const reversedItems = [].concat(routeEntry.entries).reverse(); // reverse is in place, but we want a copy so concat

  const firstItem = reversedItems[0];

  // the bottom-most component is special since it will have no children
  // (though we could probably just pass null children to it)
  let routeComponent = (
    <RouteComponent
      preload={preloadQueries}
      component={firstItem.component}
      prepared={firstItem.prepared}
      routeData={firstItem.routeData}
    />
  );
  for (let ii = 1; ii < reversedItems.length; ii++) {
    const nextItem = reversedItems[ii];
    routeComponent = (
      <RouteComponent
        preload={preloadQueries}
        component={nextItem.component}
        prepared={nextItem.prepared}
        routeData={nextItem.routeData}
      >
        {routeComponent}
      </RouteComponent>
    );
  }

  // Routes can error so wrap in an <ErrorBoundary>
  // Routes can suspend, so wrap in <Suspense>
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading....</div>}>
        {/* Indicate to the user that a transition is pending, even while showing the previous UI */}
        {isPending ? (
          <div className="RouteRenderer-pending">Loading pending...</div>
        ) : null}
        {routeComponent}
      </Suspense>
    </ErrorBoundary>
  );
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
function RouteComponent({
  children,
  routeData,
  component,
  prepared,
  preload = false,
}) {
  if (preload) {
    return <PreloadQueries prepared={prepared}>{children}</PreloadQueries>;
  }

  // We want to fix all prepared objects, since the query reference is only needed when using the server-side
  const queryKeysToPrepare = Object.keys(prepared);

  const newPrepared = {};

  queryKeysToPrepare.forEach(key => {
    newPrepared[key] = prepared[key][1];
  });

  const Component = component.read();

  return (
    <Component routeData={routeData} prepared={newPrepared}>
      {children}
    </Component>
  );
}

/**
 * PreloadQueries - A component which will just preload the route's loadQuery, instead of rendering the component
 *
 * This makes it easier to separate between 'client-only' and 'server-only' - what we really care about is having an instant
 * page load without loading indicators
 *
 * TODO: A hacky function - may be replaced with something much better in the future that will check if the loadQuery was loaded
 *
 */
function PreloadQueries({ prepared, children }) {
  const queryKeysToPrepare = Object.keys(prepared);

  // Because relay will "suspend" before loading this, we can ensure that the data will be loaded
  // before our server completes the request
  queryKeysToPrepare.forEach(key => {
    const [query, loadQuery] = prepared[key];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePreloadedQuery(query, loadQuery);
  });

  return children;
}
