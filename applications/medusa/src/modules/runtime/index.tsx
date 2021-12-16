import { createContext, ReactNode, useContext } from 'react'
import CanUseDOM from '../operations/CanUseDOM'
import SafeJSONParse from '../operations/SafeJSONParse'

interface Props {
  initial?: {} | null
  children: ReactNode
}

interface Runtime {
  getEnv: typeof getEnv
}

const RuntimeContext = createContext<Runtime | undefined>(undefined)

// Read the runtime store from the DOM on the client
const initialState = SafeJSONParse(
  (CanUseDOM && document.getElementById('runtime-store')?.textContent) ?? '{}'
)

// Read value from the DOM, OR
// read value from override (used on the server)
function getEnv (key: string, fallback?: string, stateOverride?: null | {} | undefined): string {
  const value = stateOverride != null ? stateOverride[key] : initialState[key]
  return value !== undefined ? value : fallback
}

// RuntimeProvider is a universal provider that allows you to grab environment variables while on the server &&
// the client.
// On the server, we would pass the 'initial' prop into the context and an element with the name 'runtime-store'
// containing some JSON.
// This way, the server controls the variables that are exposed
function RuntimeProvider ({
  initial,
  children
}: Props): JSX.Element {
  return (
    <RuntimeContext.Provider value={{ getEnv: (key, fallback) => getEnv(key, fallback, initial) }}>
      {children}
    </RuntimeContext.Provider>
  )
}

const useRuntime = (): [typeof getEnv] => {
  const context = useContext(RuntimeContext)

  if (context === undefined) {
    throw new Error('useRuntime must be used within a RuntimeProvider')
  }

  return [context.getEnv]
}

export { useRuntime, RuntimeProvider, getEnv }
