import { CircularProgress, HTMLChakraProps } from '@chakra-ui/react'

interface Props extends HTMLChakraProps<any> {
  time: number
}

export default function SimpleProgressCircle ({
  time
}: Props): JSX.Element {
  return (
    <CircularProgress
      capIsRound
      trackColor='transparent'
      color='whiteAlpha.500'
      size={6}
      value={(time * 100)}
    />
  )
}
