import { CircularProgress, HTMLChakraProps } from '@chakra-ui/react'
import { ControlPauseButton } from '@//:assets/icons/interface'
import { Icon } from '../../../../index'

interface Props extends HTMLChakraProps<any> {
  time: number
  isLoading: boolean
  isPaused: boolean
}

export default function SimpleProgressCircle ({
  time,
  isLoading,
  isPaused
}: Props): JSX.Element {
  if (isPaused && !isLoading) {
    return <Icon h={4} w={4} icon={ControlPauseButton} fill='whiteAlpha.800' />
  }

  return (
    <CircularProgress
      capIsRound
      trackColor='blackAlpha.100'
      isIndeterminate={isLoading}
      color='whiteAlpha.800'
      size={6}
      value={(time * 100)}
    />
  )
}
