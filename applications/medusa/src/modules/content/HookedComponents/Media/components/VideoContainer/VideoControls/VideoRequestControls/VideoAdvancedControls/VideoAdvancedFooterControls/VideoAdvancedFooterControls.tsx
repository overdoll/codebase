import { Flex, HStack, Stack } from '@chakra-ui/react'
import VideoPlayPause from '../../Controls/VideoPlayPause/VideoPlayPause'
import { ContainerRefProps, VideoControlTypeProps } from '../../../../VideoContainer'
import { PlayerType } from '../../../../../../types'
import VideoFullscreen from '../../Controls/VideoFullscreen/VideoFullscreen'
import useControlRequest from '../../../../../../support/useControlRequest'
import VideoVolumeTrack from '../../LazyControls/LazyVideoUnmute/VideoUnmute/VideoVolumeTrack/VideoVolumeTrack'
import { CONTROLS_CONTAINER } from '../../../../../../constants'
import VideoSeek from '../../Controls/VideoSeek/VideoSeek'
import VideoSeekTrack from '../../Controls/VideoSeek/VideoSeekTrack/VideoSeekTrack'
import LazyVideoUnmute from '../../LazyControls/LazyVideoUnmute/LazyVideoUnmute'
import { VideoControlsOpen } from '../../../VideoControls'

interface Props extends VideoControlTypeProps, ContainerRefProps, VideoControlsOpen {
  player: PlayerType
}

export default function VideoAdvancedFooterControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    containerRef,
    duration,
    isOpen
  } = props

  const playerControls = {
    seek: <VideoSeekTrack duration={duration} player={player} />,
    volume: <VideoVolumeTrack player={player} />
  }

  const {
    controls,
    request,
    cancelRequest,
    ref,
    currentControl
  } = useControlRequest<'seek' | 'volume'>({
    controls: playerControls,
    watchValue: isOpen
  })

  return (
    <Stack
      ref={ref}
      align='flex-end'
      w='100%'
      h='100%'
      spacing={2}
    >
      <Flex
        align='flex-end'
        justify='flex-end'
        h={12}
        pointerEvents={currentControl == null ? 'none' : 'auto'}
      >
        {controls}
      </Flex>
      <HStack
        {...CONTROLS_CONTAINER}
        data-ignore='click'
        h={12}
        px={4}
        align='center'
        justify='center'
        spacing={4}
      >
        <VideoPlayPause player={player} />
        <LazyVideoUnmute player={player} hasAudio={hasAudio} unMuteCallback={() => request('volume')} />
        <VideoSeek
          seekCallback={() => {
            currentControl === 'seek'
              ? cancelRequest()
              : request('seek')
          }}
          duration={duration}
        />
        <VideoFullscreen containerRef={containerRef} player={player} />
      </HStack>
    </Stack>
  )
}
