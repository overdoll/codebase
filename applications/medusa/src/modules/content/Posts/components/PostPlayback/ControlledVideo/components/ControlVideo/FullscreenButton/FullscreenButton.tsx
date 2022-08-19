import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { ControlFullscreenDisable, ControlFullscreenEnable } from '@//:assets/icons/interface'
import { Icon } from '../../../../../../../PageLayout'
import { useEffect, useState } from 'react'

interface Props extends HTMLChakraProps<any> {
  onRequestFullscreenWrapper: () => void
}

export default function FullscreenButton ({
  onRequestFullscreenWrapper
}: Props): JSX.Element {
  // TODO if on safari, fullscreen should be activated on the video element instead of the root

  const [isFullscreen, setIsFullscreen] = useState(document?.fullscreenElement == null)

  useEffect(() => {
    const onFullscreenChange = (): void => {
      setIsFullscreen(document?.fullscreenElement == null)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  if (document?.fullscreenEnabled == null || !document?.fullscreenEnabled) {
    return <></>
  }

  if (isFullscreen) {
    return (
      <Box onClick={onRequestFullscreenWrapper} cursor='pointer' w={6} h={6}>
        <Icon icon={ControlFullscreenEnable} fill='whiteAlpha.800' />
      </Box>
    )
  }

  return (
    <Box onClick={async () => await document.exitFullscreen()} cursor='pointer' w={6} h={6}>
      <Icon icon={ControlFullscreenDisable} fill='whiteAlpha.800' />
    </Box>
  )
}
