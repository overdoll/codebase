import { createContext, ReactNode, useContext, useState } from 'react'

interface Flash {
  flash: (key: string, value: string) => void
  read: (key: string, first?: boolean) => string[] | string | null
  flush: (key: string) => void
}

interface FlashOverride {
  push: (key: string, value: string) => void
  get: (key?: string) => void
  flush: (key?: string) => void
}

interface Props {
  // No flow typings exist for flush (yet) so we create some
  override?: FlashOverride
  children: ReactNode
}

const FlashContext = createContext<Flash | undefined>(undefined)

// FlashProvider is a universal "flash" provider that works on both the client and the server.
// On the server, an "override" function should be passed (from connect-flash), which will use the session store as storage
// On the client, no override function should be passed, which will result in the client using the state as storage
function FlashProvider ({
  override,
  children
}: Props): JSX.Element {
  const [flashState, editFlashState] = useState({})

  // Flash will add the value to the state or the override
  const flash = (key: string, value: string): void => {
    if (override != null) return override.push(key, value)

    if (Object.prototype.hasOwnProperty.call(flashState, key) as boolean) {
      editFlashState({
        ...flashState,
        [key]: [...flashState[key], value]
      })
    } else {
      editFlashState({
        ...flashState,
        [key]: [value]
      })
    }
  }

  // Read will read the value. By default, returns the first value, but can return an array as well
  const read = (key?: string, first: boolean = true): string[] | string | null => {
    let result

    if (override != null) {
      result = (key != null) ? override.get(key) : override.get()
    } else if (key != null) {
      result = Object.prototype.hasOwnProperty.call(flashState, key) as boolean ? flashState[key] : []
    }

    return first ? result[0] : result
  }

  // Flush will flush the state (used mainly when passing down on the server)
  // or when "dismissing" on the client-side
  const flush = (key?: string): void => {
    if (override != null) return key != null ? override.flush(key) : override.flush()

    if (key != null && Object.prototype.hasOwnProperty.call(flashState, key) as boolean) {
      const copy = { ...flashState }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete copy[key]
      editFlashState(copy)
    }
  }

  return (
    <FlashContext.Provider value={{
      flash,
      read,
      flush
    }}
    >
      {children}
    </FlashContext.Provider>
  )
}

const useFlash = (): Flash => {
  const context = useContext(FlashContext)

  if (context === undefined) {
    throw new Error('useFlash must be used within a FlashContext')
  }

  return context
}

export { useFlash, FlashProvider }
export type { FlashOverride }
