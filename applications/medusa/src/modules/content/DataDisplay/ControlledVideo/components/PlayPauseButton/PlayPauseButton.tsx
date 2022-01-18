import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { Icon } from '../../../../index'
import { ControlPauseButton, ControlPlayButton } from '@//:assets/icons/interface'

interface Props extends HTMLChakraProps<any> {
  isPaused: boolean
  onClick: () => void
}

export default function PlayPauseButton ({
  isPaused,
  onClick
}: Props): JSX.Element {
  return (
    <Box onClick={onClick} cursor='pointer' boxShadow='lg' w={6} h={6}>
      <Icon icon={isPaused ? ControlPlayButton : ControlPauseButton} fill='whiteAlpha.800' />
    </Box>
  )
}
