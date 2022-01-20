import { CircularProgress, HTMLChakraProps } from '@chakra-ui/react'

interface Props extends HTMLChakraProps<any> {
  time: number
  isLoading: boolean
}

export default function SimpleProgressCircle ({
  time,
  isLoading
}: Props): JSX.Element {
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
