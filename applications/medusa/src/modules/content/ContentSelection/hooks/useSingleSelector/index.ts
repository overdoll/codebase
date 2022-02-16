import { useState } from 'react'

export type SingleSelectedValue = string | null

export type SingleSelectedValueFunction = (id: string) => void

type SingleSelectedClearValueFunction = () => void

interface Props {
  defaultValue?: SingleSelectedValue
}

export default function useSingleSelector ({ defaultValue = null }: Props): [SingleSelectedValue, SingleSelectedValueFunction, SingleSelectedClearValueFunction] {
  const [currentSelection, setCurrentSelection] = useState<SingleSelectedValue>(defaultValue)

  const clearSelection = (): void => {
    setCurrentSelection(null)
  }

  const editSelection = (id: string): void => {
    if (currentSelection === id) {
      clearSelection()
      return
    }
    setCurrentSelection(id)
  }

  return [currentSelection, editSelection, clearSelection]
}
