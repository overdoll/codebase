import { HStack } from '@chakra-ui/react'
import VideoPlayPause from '../../Controls/VideoPlayPause/VideoPlayPause'
import { VideoControlTypeProps, VideoWatchProps } from '../../../../VideoContainer'
import { PlayerType } from '../../../../../../types'
import LazyVideoUnmute from '../../LazyControls/LazyVideoUnmute/LazyVideoUnmute'
import LazyVideoSimpleSeek from '../../LazyControls/LazyVideoSimpleSeek/LazyVideoSimpleSeek'

interface Props extends VideoControlTypeProps {
  player: PlayerType
}

export default function VideoSimpleFooterControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    duration
  } = props

  return (
    <HStack
      onClick={(e) => e.stopPropagation()}
      h={12}
      bg='dimmers.300'
      borderRadius='full'
      px={4}
      align='center'
      justify='center'
      spacing={4}
      data-ignore='click'
    >
      <VideoPlayPause player={player} />
      <LazyVideoUnmute player={player} hasAudio={hasAudio} />
      <LazyVideoSimpleSeek player={player} duration={duration} />
    </HStack>
  )
}
