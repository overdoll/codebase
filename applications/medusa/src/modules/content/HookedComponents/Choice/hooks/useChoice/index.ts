import { Choice, Choices, Id, RegisterFunctionReturn, UseChoiceProps, UseChoiceReturn } from '../../types'
import { useState } from 'react'
import { addKeyToObject, removeKeyFromObject } from '../../../../../support'
import { useUpdateEffect } from 'usehooks-ts'

function useChoice<T> (props: UseChoiceProps<T>): UseChoiceReturn<T> {
  const fallbackDefaultValue = {}

  const {
    defaultValue = fallbackDefaultValue,
    max = null,
    onChange: onChangeCallback,
    onRemove: onRemoveCallback
  } = props

  const [globalValues, setNewValues] = useState<Choices<T>>(defaultValue)

  // if the max is 1, we just want to return the most recent value
  const globalValue: Choice<T> | null = Object.keys(globalValues).length < 1
    ? null
    : {
        id: Object.keys(globalValues)[0],
        values: Object.values(globalValues)[0]
      }

  // basic function to check if the current selection is already a part of the group
  const checkIfActive = (id: Id): boolean => Object.keys(globalValues).includes(id)

  // basic function to add a value to the state
  const addValue = (id: Id, values: T): void => {
    setNewValues(prev => addKeyToObject({ [id]: values }, prev))
  }

  // basic function to remove a value from the state
  const removeValue = (id: Id): void => {
    onRemoveCallback?.(id)
    setNewValues(prev => removeKeyFromObject(id, prev))
  }

  // complex function to replace a previous value if the user tries to add over the limit
  const addOrReplacePreviousValue = (object, id: Id, values: T): Choices<T> => {
    if (Object.keys(object).length <= 1) {
      return { [id]: values }
    }
    const removedMostRecent = removeKeyFromObject((Object.keys(object))[Object.keys(object).length - 1], object)
    return addKeyToObject({ [id]: values }, removedMostRecent)
  }

  // basic function to replace all the values from the state
  const replaceValue = (id: Id, values: T): void => {
    setNewValues(prev => addOrReplacePreviousValue(prev, id, values))
  }

  // basic function to remove all values
  const clearValues = (): void => {
    setNewValues(fallbackDefaultValue)
  }

  // basic function to swap values when a choice is made
  const allowSwap = (id: Id, values: T): void => {
    if (checkIfActive(id)) {
      removeValue(id)
      return
    }
    replaceValue(id, values)
  }

  // basic function to add values when a choice is made
  const allowChange = (id: Id, values: T): void => {
    if (checkIfActive(id)) {
      removeValue(id)
      return
    }
    addValue(id, values)
  }

  // function to handle when a choice is clicked in general
  const onChange = (id: Id, values: T): void => {
    if (max == null) {
      allowChange(id, values)
      return
    }

    if (Object.keys(globalValues).length + 1 > max) {
      allowSwap(id, values)
      return
    }
    allowChange(id, values)
  }

  // quickly remove one or more values
  // TODO bulk remove values more efficiently
  const removeValues = (ids: Id[]): void => {
    ids.forEach((id) => removeValue(id))
  }

  // register the choice component to handle the internal state
  const register = (id: Id, values: T): RegisterFunctionReturn => {
    const isActive = checkIfActive(id)

    const onChangeRegister = (): void => {
      onChange(id, values)
    }

    return {
      id,
      isActive,
      onChange: onChangeRegister
    }
  }

  useUpdateEffect(() => {
    onChangeCallback?.(globalValues)
  }, [globalValues])

  return {
    register,
    values: globalValues,
    value: globalValue,
    onChange,
    removeValue,
    clearValues,
    removeValues
  }
}

export default useChoice
