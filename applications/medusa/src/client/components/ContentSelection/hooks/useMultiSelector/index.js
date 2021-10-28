/**
 * @flow
 */

import { useState } from 'react'

type Props = {
  initialSelection: Array<string>
}

export default function useMultiSelector ({ initialSelection }: Props) {
  const [currentSelection, setCurrentSelection] = useState([])

  const editSelection = (id) => {
    if (currentSelection.includes(id)) {
      setCurrentSelection(currentSelection.filter((item) => item !== id))
      return
    }
    setCurrentSelection((array) => [...array, id])
  }

  return [currentSelection, editSelection]
}
