import { formatDistanceStrict, formatDuration, intervalToDuration, isPast } from 'date-fns'
import { useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'

interface UseCountdownReturnProps {
  countdown: string
  hasPassed: boolean
  remaining: string
}

export default function useCountdown (time: number | Date | null): UseCountdownReturnProps {
  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const timeIsNull = time == null

  const formattedTime = time != null ? new Date(time) : new Date()

  const calculateRemainingTime = (): Duration => {
    return intervalToDuration({
      start: formattedTime,
      end: new Date()
    })
  }
  const [timer, setTimer] = useState(calculateRemainingTime())

  const remainingTime = formatDistanceStrict(formattedTime, new Date(), { locale })

  const hasPassed = isPast(formattedTime)

  const duration = formatDuration(timer, { locale })

  useEffect(() => {
    const timerObject = setTimeout(() => {
      !hasPassed && setTimer(calculateRemainingTime())
    }, 1000)
    return () => clearTimeout(timerObject)
  })

  return {
    countdown: duration,
    hasPassed: (!timeIsNull ? hasPassed : timeIsNull),
    remaining: remainingTime
  }
}
