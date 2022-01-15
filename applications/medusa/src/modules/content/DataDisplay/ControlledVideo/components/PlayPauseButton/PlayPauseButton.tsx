import { Box, HTMLChakraProps } from '@chakra-ui/react'

interface Props extends HTMLChakraProps<any> {
  isPaused: boolean
}

export default function PlayPauseButton ({
  isPaused
}: Props): JSX.Element {
  return (
    <Box>
      <></>
    </Box>
  )
}
