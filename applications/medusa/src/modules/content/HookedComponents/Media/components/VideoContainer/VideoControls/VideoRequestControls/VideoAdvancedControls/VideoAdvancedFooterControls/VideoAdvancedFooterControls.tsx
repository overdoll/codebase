import { Flex, HStack, Stack } from '@chakra-ui/react'
import VideoPlayPause from '../../Controls/VideoPlayPause/VideoPlayPause'
import { ContainerRefProps, VideoControlTypeProps } from '../../../../VideoContainer'
import { PlayerType } from '../../../../../../types'
import VideoFullscreen from '../../Controls/VideoFullscreen/VideoFullscreen'
import useControlRequest from '../../../../../../support/useControlRequest'
import VideoVolumeTrack from '../../LazyControls/LazyVideoUnmute/VideoUnmute/VideoVolumeTrack/VideoVolumeTrack'
import { CONTROLS_CONTAINER } from '../../../../../../constants'
import VideoSeekTrack from '../../Controls/VideoSeek/VideoSeekTrack/VideoSeekTrack'
import LazyVideoUnmute from '../../LazyControls/LazyVideoUnmute/LazyVideoUnmute'
import { VideoControlsOpen } from '../../../VideoControls'
import VideoSimpleSeek from '../../LazyControls/LazyVideoSimpleSeek/VideoSimpleSeek/VideoSimpleSeek'
import useSniffer from '../../../../../../../../../hooks/useSniffer'

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

  const { device } = useSniffer()

  const playerControls = {
    volume: <VideoVolumeTrack player={player} />
  }

  const {
    controls,
    request,
    ref,
    currentControl
  } = useControlRequest<'seek' | 'volume'>({
    controls: playerControls,
    watchValue: isOpen
  })

  const onUnMute = (): void => {
    if (device === 'pc') {
      request('volume')
    }
  }

  return (
    <HStack align='flex-end' w='100%' spacing={2} justify='space-between'>
      <VideoSeekTrack duration={duration} player={player} />
      <Stack
        ref={ref}
        align='flex-end'
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
          data-ignore='controls'
          h={12}
          px={4}
          align='center'
          justify='center'
          spacing={4}
        >
          <VideoPlayPause player={player} />
          <LazyVideoUnmute player={player} hasAudio={hasAudio} unMuteCallback={onUnMute} />
          <VideoSimpleSeek player={player} duration={duration} />
          <VideoFullscreen containerRef={containerRef} player={player} />
        </HStack>
      </Stack>
    </HStack>
  )
}
