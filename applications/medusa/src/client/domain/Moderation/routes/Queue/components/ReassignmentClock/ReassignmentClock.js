/**
 * @flow
 */
import type { Node } from 'react'
import { CircularProgress, CircularProgressLabel, Flex, Tooltip } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

type Props = {
  time: string,
}

export default function ReassignmentClock ({ time }: Props): Node {
  const [t] = useTranslation('moderation')

  const [clockColor, setClockColor] = useState('green.500')

  // Get difference in hours so that the moderator can see the reassignment deadline
  const getHourDifference = (date) => {
    const ms = 1000 * 60 * 60
    const now = new Date()
    const later = new Date(date)

    const difference = Math.round((later - now) / ms, 0)

    return difference < 0 ? 0 : difference
  }

  const reassignmentTime = getHourDifference(time)

  const reassignmentPercent = reassignmentTime / 24

  useEffect(() => {
    if (reassignmentPercent > 0.7) {
      setClockColor('green.500')
    } else if (reassignmentPercent > 0.4) {
      setClockColor('orange.500')
    } else if (reassignmentPercent >= 0) {
      setClockColor('red.500')
    }
  }, [reassignmentTime])

  return (
    <Tooltip label={t('queue.post.reassignment')}>
      <Flex align='center'>
        <CircularProgress
          size={10} value={(reassignmentTime / 24) * 100}
          color={clockColor}
        >
          <CircularProgressLabel fontSize='xs'>
            {reassignmentTime}h
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </Tooltip>
  )
}
