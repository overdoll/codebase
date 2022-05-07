import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { ControlPauseButton, ControlPlayButton } from '@//:assets/icons/interface'
import { Icon } from '../../../../../../../PageLayout'

interface Props extends HTMLChakraProps<any> {
  isPaused: boolean
  onClick: () => void
}

export default function PlayPauseButton ({
  isPaused,
  onClick
}: Props): JSX.Element {
  return (
    <Box onClick={onClick} cursor='pointer' w={6} h={6}>
      <Icon icon={isPaused ? ControlPlayButton : ControlPauseButton} fill='whiteAlpha.800' />
    </Box>
  )
}
