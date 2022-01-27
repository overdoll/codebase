import { Box, HTMLChakraProps, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import { Icon } from '../../../../../../index'
import { ControlVolumeHigh, ControlVolumeMissing, ControlVolumeMuted } from '@//:assets/icons/interface'

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
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  if (!hasAudio) {
    return (
      <Box boxShadow='lg' w={6} h={6}>
        <Icon icon={ControlVolumeMissing} fill='whiteAlpha.800' />
      </Box>
    )
  }
  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Box onClick={onChangeMuted} cursor='pointer' w={6} h={6}>
          <Icon icon={isMuted ? ControlVolumeMuted : ControlVolumeHigh} fill='whiteAlpha.800' />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        123
      </PopoverContent>
    </Popover>
  )
}
