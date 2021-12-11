/**
 * @flow
 */

import { useState } from 'react'

type Props = {
  initialSelection: string
}

export default function useSingleSelector (props: Props) {
  const [currentSelection, setCurrentSelection] = useState(props?.initialSelection || null)

  const editSelection = (id) => {
    if (currentSelection === id) {
      setCurrentSelection(null)
      return
    }
    setCurrentSelection(id)
  }

  return [currentSelection, editSelection]
}
