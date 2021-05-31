/**
 * @flow
 */
import type { Node } from 'react'
import { createContext, useContext, useState } from 'react'
import CanUseDOM from '@//:modules/utilities/CanUseDOM'
import SafeJSONParse from '@//:modules/json/json'

type Flash = {
  flash: (key: string, value: string) => void,
  read: (key: string, first: boolean) => Array<string> | string,
  flush: (key: string) => void
}

type Props = {
  // No flow typings exist for flush (yet) so we create some
  override?: {
    push: () => void,
    get: () => void,
    flush: () => void
  },
  children: Node,
};

const FlashContext = createContext({})

// On the client, we will attempt to read the flash store from the document
const initialState = SafeJSONParse(
  (CanUseDOM && document.getElementById('flash-store')?.textContent) || '{}'
)

// FlashProvider is a universal "flash" provider that works on both the client and the server.
// On the server, an "override" function should be passed (from connect-flash), which will use the session store as storage
// On the client, no override function should be passed, which will result in the client using the state as storage
function FlashProvider ({ override, children }: Props): Node {
  const [flashState, editFlashState] = useState(initialState)

  // Flash will add the value to the state or the override
  const flash = (key: string, value: string): void => {
    if (override) return override.push(key, value)

    if (Object.prototype.hasOwnProperty.call(flashState, key)) {
      editFlashState({ ...flashState, [key]: [...flashState[key], value] })
    } else {
      editFlashState({ ...flashState, [key]: [value] })
    }
  }

  // Read will read the value. By default, returns the first value, but can return an array as well
  const read = (key: string, first: boolean = true): Array<string> | string => {
    let result

    if (override) {
      result = key ? override.get(key) : override.get()
    } else {
      result = Object.prototype.hasOwnProperty.call(flashState, key) ? flashState[key] : []
    }

    return first ? result[0] : result
  }

  // Flush will flush the state (used mainly when passing down on the server)
  // or when "dismissing" on the client-side
  const flush = (key: string): void => {
    if (override) return key ? override.flush(key) : override.flush()

    if (Object.prototype.hasOwnProperty.call(flashState, key)) {
      const copy = { ...flashState }
      delete copy[key]
      editFlashState(copy)
    }
  }

  return (
    <FlashContext.Provider value={{ flash, read, flush }}>
      {children}
    </FlashContext.Provider>
  )
}

const useFlash = (): Flash => {
  return useContext(FlashContext)
}

export { useFlash, FlashProvider }
