/**
 * @flow
 */
import { parsePath } from 'history'

type Props = {
  context: any,
  location: string,
};

export default function createMockHistory ({
  context = {},
  location: loc = '/'
}: Props): any {
  if (typeof loc === 'string') loc = parsePath(loc)

  const action = 'POP'
  const location = {
    pathname: loc.pathname || '/',
    search: loc.search || '',
    hash: loc.hash || '',
    state: loc.state || null,
    key: loc.key || 'default'
  }

  return {
    get action () {
      return action
    },
    get location () {
      return location
    },
    push (url, state) {
      context.url = url
      context.state = state
    },
    replace (url, state) {
      context.url = url
      context.state = state
    },
    go (n) {
      throw new Error(
        `You cannot perform ${n === -1 ? 'GO BACK' : `GO(${n})`} on the ` +
        'server because it is a stateless environment. This error was probably ' +
        `triggered when you did a \`navigate(${n})\` somewhere in your app.`
      )
    },
    listen () {},
    block () {}
  }
}
