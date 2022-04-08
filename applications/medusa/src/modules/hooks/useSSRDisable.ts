import { useEffect, useState } from 'react'
import CanUseDOM from '../operations/CanUseDOM'

let buttonsDisabled = true

export default function useSSRDisable (): boolean {
  const [disableOverride, setDisableOverride] = useState(buttonsDisabled)

  // We need this hook here to enable the buttons after SSR hydration occurs
  // we dont want buttons to be usable until javascript is mounted or else we get issues
  useEffect(() => {
    // don't do a state update if already false
    if (!disableOverride) return

    setDisableOverride(false)

    // if the component unmounts, we will see disable flashing.
    // this is to ensure this doesn't happen on unmount
    // Note: should only be done on the client, which is why we have the CanUseDOM check
    if (CanUseDOM && buttonsDisabled) {
      buttonsDisabled = false
    }
  }, [])

  // send false if buttonsDisabled was set
  return (!buttonsDisabled ? false : disableOverride)
}
