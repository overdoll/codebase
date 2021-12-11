import type {
  Action,
  History,
  Href,
  Location,
  LocationDescriptorObject,
  LocationListener,
  LocationState,
  TransitionPromptHook,
  UnregisterCallback
} from 'history'
import { parsePath, Path } from 'history'

interface Context {
  url?: string
  state?: unknown
}

interface Props {
  context: Context
  loc: Location
}

export default function createMockHistory ({
  context = {},
  loc
}: Props): History {
  if (typeof loc === 'string') loc = parsePath(loc)

  const action = 'POP'
  const location = {
    pathname: loc.pathname ?? '/',
    search: loc.search ?? '',
    hash: loc.hash ?? '',
    state: loc.state ?? null,
    key: loc.key ?? 'default'
  }

  return {
    createHref (location: LocationDescriptorObject<LocationState>): Href {
      return ''
    },
    length: 0,
    goBack (): void {
    },
    goForward (): void {
    },
    get action (): Action {
      return action
    },
    get location () {
      return location
    },
    push (url: Path, state?: LocationState): void {
      context.url = url
      context.state = state
    },
    replace (url: Path, state?: LocationState): void {
      context.url = url
      context.state = state
    },
    go (n: number) {
      throw new Error(
        `You cannot perform ${n === -1 ? 'GO BACK' : `GO(${n})`} on the ` +
        'server because it is a stateless environment. This error was probably ' +
        `triggered when you did a \`navigate(${n})\` somewhere in your app.`
      )
    },
    block (prompt: boolean | string | TransitionPromptHook<LocationState> | undefined): UnregisterCallback {
      return () => {
      }
    },
    listen (listener: LocationListener<LocationState>): UnregisterCallback {
      return () => {
      }
    }
  }
}
