/**
 * @flow
 */
import type { Node } from 'react'
import { createContext, useContext } from 'react'
import CanUseDOM from '@//:modules/utilities/CanUseDOM'
import SafeJSONParse from '@//:modules/json/json'

type Props = {
  initial?: {},
  children: Node,
};

const RuntimeContext = createContext({})

// Read the runtime store from the DOM on the client
const initialState = SafeJSONParse(
  (CanUseDOM && document.getElementById('runtime-store')?.textContent) || '{}'
)

// Read value from the DOM, OR
// read value from override (used on the server)
function getEnv (key: string, fallback = null, stateOverride = null): string {
  const value = stateOverride ? stateOverride[key] : initialState[key]
  return value !== undefined ? value : fallback
}

// RuntimeProvider is a universal provider that allows you to grab environment variables while on the server &&
// the client.
// On the server, we would pass the 'initial' prop into the context and an element with the name 'runtime-store'
// containing some JSON.
// This way, the server controls the variables that are exposed
function RuntimeProvider ({ initial, children }: Props): Node {
  return (
    <RuntimeContext.Provider value={{ getEnv: (key, fallback) => getEnv(key, fallback, initial) }}>
      {children}
    </RuntimeContext.Provider>
  )
}

const useRuntime = () => {
  const values = useContext(RuntimeContext)
  return [values.getEnv]
}

export { useRuntime, RuntimeProvider, getEnv }
