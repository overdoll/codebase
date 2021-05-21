/**
 * @flow
 */
import type { Node } from 'react'
import { createContext, useContext, useState } from 'react'
import CanUseDOM from '@//:modules/utilities/CanUseDOM'
import SafeJSONParse from '@//:modules/json/json'

type Props = {
  override?: any,
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

  const flash = (key, value) => {
    if (override) return override.push(key, value)

    if (Object.prototype.hasOwnProperty.call(flashState, key)) {
      editFlashState({ ...flashState, [key]: [...flashState[key], value] })
    } else {
      editFlashState({ ...flashState, [key]: [value] })
    }
  }

  const read = (key, first = true) => {
    let result

    if (override) {
      result = key ? override.get(key) : override.get()
    } else {
      result = Object.prototype.hasOwnProperty.call(flashState, key) ? flashState[key] : []
    }

    return first ? result[0] : result
  }

  const flush = key => {
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

const useFlash = () => {
  const values = useContext(FlashContext)

  return [values.read, values.flash, values.flush]
}

export { useFlash, FlashProvider }
