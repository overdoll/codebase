import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { ControlFullscreenEnable } from '@//:assets/icons/interface'
import { Icon } from '../../../../../../../PageLayout'

interface Props extends HTMLChakraProps<any> {
  onClick: () => void
}

export default function FullscreenButton ({ onClick }: Props): JSX.Element {
  return (
    <Box onClick={onClick} cursor='pointer' w={6} h={6}>
      <Icon icon={ControlFullscreenEnable} fill='whiteAlpha.800' />
    </Box>
  )
}
