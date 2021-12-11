/**
 * @flow
 */

import { useEffect, useState } from 'react';

type Props = {
  storageVariableName: string,
}

export default function useClickDelay ({ storageVariableName }: Props) {
  const [currentTimer, setTimer] = useState(0)
  const [isTimedOut, setTimedOut] = useState(false)
  const [localVariable, setLocalVariable] = useState('empty')
  const [checked, setChecked] = useState(false)

  const subValue = 1000

  useEffect(() => {
    setLocalVariable(sessionStorage.getItem(storageVariableName))
    if (localVariable !== 'empty' && !checked) {
      if (localVariable !== null) {
        setTimer(localVariable)
        createTimer(localVariable)
        setTimedOut(true)
      }
      setChecked(true)
    }
  })

  const createTimer = (time: number) => {
    const interval = setInterval(() => {
      setTimer(x => {
        sessionStorage.setItem(storageVariableName, x - subValue)
        return x - subValue
      })
    }, subValue)

    setTimeout(() => {
      clearTimeout(interval)
    }, time)
  }

  const createTimeout = (timeOutLength: number) => {
    if (!localVariable) {
      setTimer(timeOutLength)
      createTimer(timeOutLength)
      setTimedOut(true)
    }
  }

  const clearTimeout = interval => {
    setTimedOut(false)
    clearInterval(interval)
    sessionStorage.removeItem(storageVariableName)
  }

  return [isTimedOut, currentTimer, createTimeout]
}
