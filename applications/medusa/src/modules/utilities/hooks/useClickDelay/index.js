/**
 * @flow
 */

import { useState, useEffect } from 'react'

type Props = {
  storageVariableName: string,
}

export default function useClickDelay ({ storageVariableName }: Props) {
  const [currentTimer, setTimer] = useState(0)
  const [isTimedOut, setTimedOut] = useState(false)
  const [localVariable, setLocalVariable] = useState('empty')
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setLocalVariable(sessionStorage.getItem(storageVariableName))
    if (localVariable !== 'empty' && !checked) {
      if (localVariable != null) {
        setTimer(parseInt(localVariable))
        createTimer(parseInt(localVariable))
        setTimedOut(true)
      }
      setChecked(true)
    }
  })

  const createTimer = (time: number) => {
    const interval = setInterval(() => {
      setTimer(x => {
        sessionStorage.setItem(storageVariableName, x - 1000)
        return x - 1000
      })
    }, 1000)

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
