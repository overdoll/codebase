/**
 * @flow
 */
import type { Node } from 'react'
import { createContext, useContext, useState } from 'react'
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

// RuntimeProvider is a universal provider that allows you to grab environment variables while on the server &&
// the client.
// On the server, we would pass the 'initial' prop into the context and an element with the name 'runtime-store'
// containing some JSON.
// This way, the server controls the variables that are exposed
function RuntimeProvider ({ initial, children }: Props): Node {
  const [runtimeEnv] = useState(initialState)

  // Read value either from 'initial' (when used on the server) or from the state
  // (when used on the client)
  const getEnv = (key, fallback = null) => {
    const value = initial ? initial[key] : runtimeEnv[key]

    return value !== undefined ? value : fallback
  }

  return (
    <RuntimeContext.Provider value={{ getEnv }}>
      {children}
    </RuntimeContext.Provider>
  )
}

const useRuntime = () => {
  const values = useContext(RuntimeContext)
  return [values.getEnv]
}

export { useRuntime, RuntimeProvider }
