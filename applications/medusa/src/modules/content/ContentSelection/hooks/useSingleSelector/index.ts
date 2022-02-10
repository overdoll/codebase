import { useState } from 'react'

export type SingleSelectedValue = string | null

export type SingleSelectedValueFunction = (id: string) => void

interface Props {
  defaultValue?: SingleSelectedValue
}

export default function useSingleSelector ({ defaultValue = null }: Props): [SingleSelectedValue, SingleSelectedValueFunction] {
  const [currentSelection, setCurrentSelection] = useState<SingleSelectedValue>(defaultValue)

  const editSelection = (id: string): void => {
    if (currentSelection === id) {
      setCurrentSelection(null)
      return
    }
    setCurrentSelection(id)
  }

  return [currentSelection, editSelection]
}
