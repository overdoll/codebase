import { useState } from 'react'

interface Props {
  initialSelection: string
}

export default function useSingleSelector (props: Props): [string | null, (id: string) => void] {
  const [currentSelection, setCurrentSelection] = useState<string | null>(props.initialSelection ?? null)

  const editSelection = (id: string): void => {
    if (currentSelection === id) {
      setCurrentSelection(null)
      return
    }
    setCurrentSelection(id)
  }

  return [currentSelection, editSelection]
}
