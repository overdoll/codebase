import { VideoContainerProps } from '../VideoContainer/VideoContainer'
import { OnPlayerInitType, PlayerType } from '../../types'
import { useEffect, useState } from 'react'
import StorageVideoContainer from './StorageVideoContainer/StorageVideoContainer'
import useObserveVideo from '../../support/useObserveVideo'
import { Flex } from '@chakra-ui/react'
import { pauseVideo, playVideo, startOrPlayVideo } from '../../support/controls'
import syncPlayerPlayPause from '../../support/syncPlayerPlayPause'
import syncPlayerLoading from '../../support/syncPlayerLoading'

export interface ObserveVideoContainerProps {
  isActive: boolean
}

interface Props extends Omit<VideoContainerProps, 'volume' | 'muted'>, ObserveVideoContainerProps {
  onPlayerInit?: OnPlayerInitType
}

export default function ObserveVideoContainer (props: Props): JSX.Element {
  const {
    onPlayerInit,
    isActive,
    autoPlay,
    ...rest
  } = props

  const [player, setPlayer] = useState<PlayerType | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(player?.video?.paused !== true)

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit?.(player)
  }

  const {
    ref,
    isObserving,
    isObservingDebounced
  } = useObserveVideo({})

  // play video if it hasn't been loaded yet, and you're focused into it
  useEffect(() => {
    if (player != null && player?.video == null && autoPlay === false && isObservingDebounced && isActive) {
      startOrPlayVideo(player)
    }
  }, [isObservingDebounced, isActive, player, autoPlay, isLoading])

  // play video when you scroll into it, slide is active, and it is paused
  useEffect(() => {
    if (player == null) return
    if (isObservingDebounced && isActive && !playing && !isLoading) {
      playVideo(player)
    }
  }, [isObservingDebounced, isActive, player, playing, isLoading])

  // pause video when you're scrolled into it, slide is not active, and it is paused
  // TODO stop loading if scrolled away from loading video, or stop autoplay
  useEffect(() => {
    if (player == null) return
    if (isObserving && !isActive && !playing) {
      pauseVideo(player)
    }
  }, [isObserving, isActive, playing, player])

  // pause video when you scroll away
  // TODO stop loading if scrolled away from loading video, or stop autoplay
  useEffect(() => {
    if (player == null) return
    if (!isObserving && !playing) {
      pauseVideo(player)
    }
  }, [isObserving, playing, player])

  // keep track of video states
  syncPlayerLoading(player, setLoading)
  syncPlayerPlayPause(player, setPlaying, setPlayer)

  return (
    <Flex
      ref={ref}
      w='100%'
      h='100%'
      align='center'
      justify='center'
      borderRadius='inherit'
    >
      <StorageVideoContainer
        autoPlay={isActive && autoPlay === true}
        onPlayerInit={setPlayers}
        {...rest}
      />
    </Flex>
  )
}
