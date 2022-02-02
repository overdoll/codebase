import { useState } from 'react'
import { addKeyToObject, removeKeyFromObject } from '../../../../support'

export interface MultiSelectedValue {
  [id: string]: {
    name: string
    [extra: string]: string | undefined
  }
}

export type MultiSelectedValueFunction = (id: string, name: string, type?: string | undefined) => void

interface Props {
  defaultValue?: MultiSelectedValue
  onRemove?: ((id) => void) | undefined
  onAdd?: ((object: MultiSelectedValue) => void) | undefined
}

export default function useMultiSelector ({
  defaultValue = {},
  onAdd,
  onRemove
}: Props): [MultiSelectedValue, MultiSelectedValueFunction, (id: string) => void] {
  const [currentSelection, setCurrentSelection] = useState<MultiSelectedValue>(defaultValue)

  const removeSelection = (id: string): void => {
    setCurrentSelection(value => removeKeyFromObject(id, value))
    onRemove?.(id)
  }

  const editSelection = (id: string, name: string, type?: string | undefined): void => {
    const object = {
      [id]: {
        name: name,
        type: type
      }
    }

    if (currentSelection[id] != null) {
      removeSelection(id)
      return
    }
    setCurrentSelection(prev => addKeyToObject(object, prev))
    onAdd?.(object)
  }

  return [currentSelection, editSelection, removeSelection]
}
