import { useEffect, useState } from 'react'

interface Props {
  storageVariableName: string
}

export default function useClickDelay ({ storageVariableName }: Props): [boolean, number, (timeout: number) => void] {
  const [currentTimer, setTimer] = useState<number>(0)
  const [isTimedOut, setTimedOut] = useState<boolean>(false)
  const [localVariable, setLocalVariable] = useState<string | null | number>('empty')
  const [checked, setChecked] = useState<boolean>(false)

  const subValue = 1000

  useEffect(() => {
    setLocalVariable(sessionStorage.getItem(storageVariableName))
    if (localVariable !== 'empty' && !checked) {
      if (localVariable !== null) {
        setTimer(localVariable as number)
        createTimer(localVariable as number)
        setTimedOut(true)
      }
      setChecked(true)
    }
  })

  const createTimer = (time: number): void => {
    const interval = setInterval(() => {
      setTimer(x => {
        sessionStorage.setItem(storageVariableName, String(x - subValue))
        return x - subValue
      })
    }, subValue)

    setTimeout(() => {
      clearTimeout(interval)
    }, time)
  }

  const createTimeout = (timeOutLength: number): void => {
    if (localVariable == null) {
      setTimer(timeOutLength)
      createTimer(timeOutLength)
      setTimedOut(true)
    }
  }

  const clearTimeout = (interval: NodeJS.Timeout): void => {
    setTimedOut(false)
    clearInterval(interval)
    sessionStorage.removeItem(storageVariableName)
  }

  return [isTimedOut, currentTimer, createTimeout]
}
