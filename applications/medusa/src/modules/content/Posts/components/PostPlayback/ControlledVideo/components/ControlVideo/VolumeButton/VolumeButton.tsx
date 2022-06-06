import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { ControlVolumeHigh, ControlVolumeMissing, ControlVolumeMuted } from '@//:assets/icons/interface'
import { Icon } from '../../../../../../../PageLayout'

interface Props extends HTMLChakraProps<any> {
  isMuted: boolean
  onChangeMuted: () => void
  hasAudio: boolean
}

export default function VolumeButton ({
  isMuted,
  onChangeMuted,
  hasAudio
}: Props): JSX.Element {
  if (!hasAudio) {
    return (
      <Box boxShadow='lg' w={6} h={6}>
        <Icon icon={ControlVolumeMissing} fill='whiteAlpha.800' />
      </Box>
    )
  }
  return (
    <Box onClick={onChangeMuted} cursor='pointer' w={6} h={6}>
      <Icon icon={isMuted ? ControlVolumeMuted : ControlVolumeHigh} fill='whiteAlpha.800' />
    </Box>
  )
}
